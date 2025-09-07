"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// --- FINAL, CORRECTED Reusable Radial Chart Component ---
const MetricRadialChart = ({ value, text, color }: { value: number; text: string; color: string }) => {
  const chartData = [{ name: 'metric', value, fill: color }];

  return (
    <div className="relative flex h-40 w-full items-center justify-center">
      <ChartContainer
        config={{
          metric: {
            label: "Metric",
            color: color,
          },
        }}
        className="absolute inset-0"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius={60}
          outerRadius={75}
          barSize={12}
          cy="50%"
        >
          <PolarAngleAxis 
            type="number" 
            domain={[0, 100]} 
            tick={false} 
          />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "hsl(var(--muted))" }}
          />
        </RadialBarChart>
      </ChartContainer>
      <div className="flex flex-col items-center justify-center">
        <span className="font-hero text-3xl font-bold" style={{ color: color }}>
          {text}
        </span>
      </div>
    </div>
  );
};


// --- Updated PerformanceMetrics Component ---
const PerformanceMetrics = () => {
  const metrics = [
    {
      title: "AI Decision Efficiency",
      value: "78%",
      progressValue: 78,
      status: "GOOD",
      details: "156 AI / 200 total decisions today",
      description: "How often AI makes smart decisions vs getting overridden.",
      textColor: "text-green-500",
      chartColor: "#22c55e",
    },
    {
      title: "Queue Reduction Performance",
      value: "37%",
      progressValue: 37,
      status: "EXCELLENT",
      details: "12.5 avg vehicles (was 20 before AI)",
      description: "How well AI reduces vehicle queues compared to before.",
      textColor: "text-emerald-500",
      chartColor: "#10b981",
    },
    {
      title: "Emergency Response Time",
      value: "1.6s",
      progressValue: 95,
      status: "EXCELLENT",
      details: "8 emergency responses today",
      description: "How fast the system responds to emergencies.",
      textColor: "text-emerald-500",
      chartColor: "#10b981",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EXCELLENT":
        return "text-emerald-500 bg-emerald-500/10";
      case "GOOD":
        return "text-green-500 bg-green-500/10";
      case "AVERAGE":
        return "text-yellow-500 bg-yellow-500/10";
      case "POOR":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-hero text-5xl mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Performance Metrics
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-3xl">
              Comprehensive performance analysis based on AI output data, measuring efficiency,
              queue reduction, and emergency response capabilities.
            </p>
          </motion.div>

          {/* Core Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-8 mb-12"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-elegant transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-body text-lg font-semibold text-foreground leading-tight">
                        {metric.title}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col flex-grow justify-center">
                    <MetricRadialChart
                      value={metric.progressValue}
                      text={metric.value}
                      color={metric.chartColor}
                    />
                    <div className="text-center font-body text-sm text-muted-foreground mt-4">
                      {metric.details}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Performance Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Performance Summary
                </CardTitle>
                <p className="font-body text-muted-foreground">
                  Key insights from today's AI traffic management system performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-body text-lg font-semibold text-foreground">
                      Decision Analytics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">AI Decisions</span>
                        <span className="font-body font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Emergency Overrides</span>
                        <span className="font-body font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Queue Overrides</span>
                        <span className="font-body font-medium">12</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-body font-semibold">Total Decisions</span>
                        <span className="font-body font-semibold">200</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-body text-lg font-semibold text-foreground">
                      Traffic Impact
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Current Avg Queue</span>
                        <span className="font-body font-medium">12.5 vehicles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Baseline (Pre-AI)</span>
                        <span className="font-body font-medium">20 vehicles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Emergency Responses</span>
                        <span className="font-body font-medium">8 today</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-body font-semibold text-emerald-600">Improvement</span>
                        <span className="font-body font-semibold text-emerald-600">37% reduction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerformanceMetrics;