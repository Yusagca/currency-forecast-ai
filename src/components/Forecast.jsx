import React, { useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Forecast = () => {
  const [forecastType, setForecastType] = useState("currency");
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false); // Toggle layout after fetching

  const forecastCache = useRef({});

  const resetLayout = () => {
    setForecast(null);
    setShowGraph(false); // Return to the initial layout
  };

  const fetchForecast = async () => {
    setLoading(true);
    setShowGraph(true); // Transition to graph layout immediately

    const cacheKey =
      forecastType === "currency"
        ? `${forecastType}-${currency}-${frequency}-${startDate}-${endDate}`
        : "inflation";

    if (forecastCache.current[cacheKey]) {
      setForecast(forecastCache.current[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      const url = forecastType === "currency" ? "/forecast" : "/inflation";
      const requestData =
        forecastType === "currency"
          ? { currency, frequency, start_date: startDate, end_date: endDate }
          : {};

      const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, requestData);
      forecastCache.current[cacheKey] = response.data;
      setForecast(response.data);
    } catch (error) {
      console.error("Tahmin alınırken bir hata oluştu:", error);
    }

    setLoading(false);
  };

  const chartData = {
    labels: forecast?.dates || [],
    datasets: [
      {
        label:
          forecastType === "currency"
            ? `Tahmin (${currency})`
            : "Enflasyon Tahmini",
        data: forecast?.forecast || [],
        borderColor: "#15803d",
        backgroundColor: "rgba(21, 128, 61, 0.1)",
        tension: 0.4,
      },
      ...(forecastType === "currency" && forecast?.conf_intervals
        ? [
            {
              label: "Alt Güven Aralığı",
              data: forecast?.conf_intervals?.map((ci) => ci[0]) || [],
              borderColor: "#dc2626",
              borderDash: [5, 5],
              fill: false,
            },
            {
              label: "Üst Güven Aralığı",
              data: forecast?.conf_intervals?.map((ci) => ci[1]) || [],
              borderColor: "#16a34a",
              borderDash: [5, 5],
              fill: false,
            },
          ]
        : []),
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#f1f5f9",
        },
      },
      title: {
        display: true,
        text:
          forecastType === "currency"
            ? `${currency} İçin Tahmin`
            : "Enflasyon Tahmini",
        color: "#f1f5f9",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
      y: {
        grid: { display: true, color: "#475569" },
        ticks: { color: "#94a3b8" },
      },
    },
  };

  return (
    <div className="p-12 bg-slate-900 text-slate-100 flex h-screen items-center justify-center transition-all duration-500 ease-in-out">
      <div
        className={`transition-all duration-700 ease-in-out flex ${
          showGraph ? "w-full" : "w-full flex-col items-center"
        }`}
      >
        <div
          className={`transition-all duration-700 ease-in-out ${
            showGraph ? "w-1/4 bg-slate-800" : "w-full max-w-lg bg-transparent"
          }  rounded-lg p-6 shadow-md`}
        >
          <h1 className="text-2xl font-bold text-emerald-500 mb-6">
            Tahmin <span className="text-2xl font-bold text-slate-100 mb-6">Seçenekleri</span>
          </h1>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-slate-400 font-medium mb-2">
                Tahmin Türü
              </label>
              <select
                value={forecastType}
                onChange={(e) => {
                  setForecastType(e.target.value);
                  resetLayout();
                }}
                className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring focus:border-emerald-500"
              >
                <option value="currency">Döviz</option>
                <option value="inflation">Enflasyon</option>
              </select>
            </div>
            {forecastType === "currency" && (
              <>
                <div>
                  <label className="block text-slate-400 font-medium mb-2">
                    Döviz
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      resetLayout();
                    }}
                    className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring focus:border-emerald-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-2">
                    Frekans
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => {
                      setFrequency(e.target.value);
                      resetLayout();
                    }}
                    className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring focus:border-emerald-500"
                  >
                    <option value="1">Günlük</option>
                    <option value="0">Aylık</option>
                  </select>
                </div>
                {frequency === "1" && (
                  <>
                    <div>
                      <label className="block text-slate-400 font-medium mb-2">
                        Başlangıç Tarihi
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-2">
                        Bitiş Tarihi
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:outline-none focus:ring focus:border-emerald-500"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <button
            onClick={fetchForecast}
            className="w-full bg-emerald-700 text-white py-2 px-4 rounded-md hover:bg-emerald-600 hover:border-emerald-500 border border-emerald-700 transition-all duration-300 mt-4"
          >
            Tahmini Al
          </button>
        </div>

        {showGraph && (
          <div className="flex-1 bg-slate-800 rounded-lg p-6 ml-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-75 mb-4"></div>
              <p className="text-lg text-green-400 font-medium">
                Modelimiz geleceği görüyor, lütfen bekleyin...
              </p>
            </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-emerald-500 mb-6">
            Tahmin <span className="text-2xl font-bold text-slate-100 mb-6">Grafiği</span>
          </h1>
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;
