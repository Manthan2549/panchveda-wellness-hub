import ArogyaMitra from "@/components/ArogyaMitra";
import Navbar from "@/components/Navbar";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ArogyaMitra />
      </div>
    </div>
  );
};

export default Chat;