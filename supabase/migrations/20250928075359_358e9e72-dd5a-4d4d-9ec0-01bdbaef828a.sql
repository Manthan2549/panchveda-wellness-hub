-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('patient', 'practitioner');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create practitioners table for additional practitioner info
CREATE TABLE public.practitioners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  specialization TEXT,
  experience_years INTEGER,
  license_number TEXT,
  bio TEXT,
  consultation_fee DECIMAL(10,2),
  available_days TEXT[], -- Array of days: ['monday', 'tuesday', etc.]
  available_hours JSONB, -- Time slots: {"start": "09:00", "end": "17:00"}
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapy sessions table
CREATE TABLE public.therapy_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapy_type TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create emotional_logs table for tracking patient emotions
CREATE TABLE public.emotional_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emotion TEXT NOT NULL,
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 10),
  notes TEXT,
  logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wellness_schedule table for AI-generated daily schedules
CREATE TABLE public.wellness_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  schedule_date DATE NOT NULL,
  activities JSONB NOT NULL, -- Array of activities with times
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create practitioner_guidance table for custom tips
CREATE TABLE public.practitioner_guidance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  practitioner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotional_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practitioner_guidance ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for practitioners (patients can view all, practitioners can view/update their own)
CREATE POLICY "Anyone can view practitioners" ON public.practitioners
  FOR SELECT USING (true);

CREATE POLICY "Practitioners can update their own profile" ON public.practitioners
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Practitioners can insert their own profile" ON public.practitioners
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for therapy sessions
CREATE POLICY "Users can view their own therapy sessions" ON public.therapy_sessions
  FOR SELECT USING (auth.uid() = patient_id OR auth.uid() = practitioner_id);

CREATE POLICY "Patients can create therapy sessions" ON public.therapy_sessions
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Practitioners can update therapy sessions" ON public.therapy_sessions
  FOR UPDATE USING (auth.uid() = practitioner_id);

-- Create RLS policies for emotional logs
CREATE POLICY "Users can view their own emotional logs" ON public.emotional_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emotional logs" ON public.emotional_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for wellness schedules
CREATE POLICY "Users can view their own wellness schedules" ON public.wellness_schedules
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wellness schedules" ON public.wellness_schedules
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for practitioner guidance
CREATE POLICY "Users can view guidance sent to them" ON public.practitioner_guidance
  FOR SELECT USING (auth.uid() = patient_id OR auth.uid() = practitioner_id);

CREATE POLICY "Practitioners can create guidance" ON public.practitioner_guidance
  FOR INSERT WITH CHECK (auth.uid() = practitioner_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- If user is a practitioner, also create practitioner profile
  IF (NEW.raw_user_meta_data->>'role')::user_role = 'practitioner' THEN
    INSERT INTO public.practitioners (user_id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_practitioners_updated_at
  BEFORE UPDATE ON public.practitioners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapy_sessions_updated_at
  BEFORE UPDATE ON public.therapy_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();