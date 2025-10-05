import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TriangleLoader } from "./TriangleLoader";

const viewsData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 7500 },
];

const genreData = [
  { name: "Action", value: 30 },
  { name: "Drama", value: 25 },
  { name: "Comedy", value: 20 },
  { name: "Thriller", value: 15 },
  { name: "Sci-Fi", value: 10 },
];

const userGrowthData = [
  { name: "Q1", value: 10000 },
  { name: "Q2", value: 25000 },
  { name: "Q3", value: 45000 },
  { name: "Q4", value: 80000 },
];

const COLORS = ["hsl(270, 75%, 60%)", "hsl(195, 85%, 55%)", "hsl(310, 80%, 55%)", "hsl(45, 90%, 60%)", "hsl(150, 70%, 50%)"];

export const StatisticsSection = () => {
  const [dataType, setDataType] = useState<"views" | "genres" | "users">("views");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChartTypeChange = (type: "bar" | "line" | "pie") => {
    setIsLoading(true);
    setTimeout(() => {
      setChartType(type);
      setIsLoading(false);
    }, 3500);
  };

  const getData = () => {
    switch (dataType) {
      case "views":
        return viewsData;
      case "genres":
        return genreData;
      case "users":
        return userGrowthData;
      default:
        return viewsData;
    }
  };

  const canShowPie = dataType === "genres";

  const downloadData = () => {
    const data = getData();
    const csv = [
      ["Name", "Value"],
      ...data.map((item) => [item.name, item.value]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataType}-statistics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <TriangleLoader />;
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2
          className={`mb-12 text-center text-5xl font-black tracking-tight md:text-6xl ${
            isVisible ? "animate-pop-in" : "opacity-0"
          }`}
          style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Platform Statistics
        </h2>

        {/* Controls */}
        <div className={`mb-8 flex flex-wrap items-center justify-between gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-wrap gap-4">
            <Select value={dataType} onValueChange={(value: any) => setDataType(value)}>
              <SelectTrigger className="w-48 bg-card border-primary/30">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Monthly Views</SelectItem>
                <SelectItem value="genres">Genre Distribution</SelectItem>
                <SelectItem value="users">User Growth</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={() => handleChartTypeChange("bar")}
                variant={chartType === "bar" ? "default" : "outline"}
                className={chartType === "bar" ? "bg-primary" : ""}
              >
                Bar Chart
              </Button>
              <Button
                onClick={() => handleChartTypeChange("line")}
                variant={chartType === "line" ? "default" : "outline"}
                className={chartType === "line" ? "bg-primary" : ""}
              >
                Line Graph
              </Button>
              {canShowPie && (
                <Button
                  onClick={() => handleChartTypeChange("pie")}
                  variant={chartType === "pie" ? "default" : "outline"}
                  className={chartType === "pie" ? "bg-primary" : ""}
                >
                  Pie Chart
                </Button>
              )}
            </div>
          </div>

          <Button
            onClick={downloadData}
            className="bg-secondary hover:bg-secondary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Data
          </Button>
        </div>

        {/* Chart */}
        <div
          className={`rounded-2xl p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{
            background: "var(--gradient-card)",
            boxShadow: "var(--shadow-card)",
            animationDelay: "0.4s",
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "bar" ? (
              <BarChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(245, 15%, 20%)" />
                <XAxis dataKey="name" stroke="hsl(0, 0%, 98%)" />
                <YAxis stroke="hsl(0, 0%, 98%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(245, 20%, 12%)",
                    border: "1px solid hsl(270, 75%, 60%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="hsl(270, 75%, 60%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(245, 15%, 20%)" />
                <XAxis dataKey="name" stroke="hsl(0, 0%, 98%)" />
                <YAxis stroke="hsl(0, 0%, 98%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(245, 20%, 12%)",
                    border: "1px solid hsl(270, 75%, 60%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(195, 85%, 55%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(195, 85%, 55%)", r: 6 }}
                />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={getData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getData().map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
