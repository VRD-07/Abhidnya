import { Link } from "react-router-dom";
import { MapPin, Camera, Vote } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Walk Near It, Know About It",
    desc: "Proximity-triggered notifications. No app needed.",
  },
  {
    icon: Camera,
    title: "Before & After Proof",
    desc: "Every project has photo evidence. No fake completions.",
  },
  {
    icon: Vote,
    title: "Citizens as Auditors",
    desc: "Flag broken or incomplete work directly from the notification.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
        <div className="max-w-4xl slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
            The Government Built It.
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-primary mt-2 leading-tight">
            Now You'll Know.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Abhidnya notifies citizens automatically when a government project is completed near them — with proof, cost, and scheme details.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/map"
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg card-lift hover:brightness-110 transition-all"
            >
              Explore Live Map
            </Link>
            <Link
              to="/admin"
              className="px-8 py-3.5 border-2 border-foreground/30 text-foreground font-semibold rounded-lg card-lift hover:border-foreground/60 transition-all"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-8 card-lift border border-border"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-5">
                <f.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
