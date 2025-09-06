import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Target, TrendingUp } from "lucide-react";

const ScrollContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep dive into your data with sophisticated analysis tools that reveal hidden patterns and opportunities."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Root Cause Analysis",
      description: "Identify the fundamental drivers behind your metrics and understand what truly impacts your success."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Performance Tracking",
      description: "Monitor key performance indicators in real-time and track your progress toward strategic goals."
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen py-20">
      <motion.div 
        style={{ y }}
        className="container mx-auto px-6"
      >
        {/* Section 1: Value Proposition */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="font-hero text-5xl md:text-7xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Uncover What Matters
          </h2>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Stop guessing and start knowing. Our platform transforms complex data 
            into clear, actionable insights that drive real business outcomes.
          </p>
          <Button className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-8 py-4 text-lg font-medium group">
            <a href="/dashboard" className="flex items-center">
              Get Started
            </a>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.section>

        {/* Section 2: Features */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-foreground group-hover:shadow-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-body text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-hero text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Ready to Find Your
          </h2>
          <h2 className="font-hero text-4xl md:text-6xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Route Cause?
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of businesses that have discovered their path to success 
            through data-driven insights and root cause analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-8 py-4 text-lg font-medium">
              Start Free Trial
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg font-medium border-primary text-primary hover:bg-primary/10">
              Schedule Demo
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default ScrollContent;