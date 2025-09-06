import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  // Sample data for the area chart
  const chartData = [
    { month: "Jan", traffic: 186, efficiency: 80 },
    { month: "Feb", traffic: 305, efficiency: 82 },
    { month: "Mar", traffic: 237, efficiency: 75 },
    { month: "Apr", traffic: 273, efficiency: 88 },
    { month: "May", traffic: 209, efficiency: 91 },
    { month: "Jun", traffic: 214, efficiency: 85 },
  ];

  const chartConfig = {
    traffic: {
      label: "Traffic Volume",
      color: "hsl(var(--primary))",
    },
    efficiency: {
      label: "Efficiency %",
      color: "hsl(var(--primary-glow))",
    },
  };

  const metrics = [
    {
      title: "Active Intersections",
      value: "47",
      change: "+12%",
      description: "Intersections under AI control"
    },
    {
      title: "Average Wait Time",
      value: "2.3 min",
      change: "-18%",
      description: "Reduced from last month"
    },
    {
      title: "System Uptime",
      value: "99.7%",
      change: "+0.2%",
      description: "Last 30 days"
    }
  ];

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
            <h1 className="font-hero text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-3xl">
              Real-time insights into traffic optimization and system performance across all monitored intersections.
            </p>
          </motion.div>

          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="font-body text-lg font-semibold text-foreground">
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-hero text-3xl font-bold text-foreground mb-1">
                        {metric.value}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-body text-sm font-medium ${
                          metric.change.startsWith('+') ? 'text-green-500' : 
                          metric.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'
                        }`}>
                          {metric.change}
                        </span>
                        <span className="font-body text-sm text-muted-foreground">
                          {metric.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Traffic Analysis Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="fillTraffic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="traffic"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#fillTraffic)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Backend Operations Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Backend Operations
                </CardTitle>
                <p className="font-body text-muted-foreground">
                  See how our AI systems process traffic data in real-time to optimize intersection timings.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="font-body text-muted-foreground">
                      Backend operations video will be integrated here
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      Placeholder for real-time system visualization
                    </p>
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

export default Dashboard;