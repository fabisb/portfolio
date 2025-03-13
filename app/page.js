"use client";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import About from "@/components/about";
import Education from "@/components/education/education";
import Experiences from "@/components/experiences/experiences";
import Header from "@/components/header";
import Volunteering from "@/components/volunteering/volunteering";
import Projects from "@/components/projects/projects";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/translations/${language}.json`);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, [language]);

  if (!data) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-6 lg:px-24">
      {/* Botones de idioma */}
      <div className="mb-8 z-2 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row justify-between">
        <div className="inline-flex rounded-md shadow-xs lg:pl-[50%]" role="group">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={classNames(
              "inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg transition-colors duration-200",
              {
                "bg-white text-primary-400": language === "en",
                "bg-gray-800 text-white hover:bg-gray-700 hover:text-primary-400": language !== "en",
              }
            )}
          >
            En
            <img src="/logos/en-flag.png" className="ms-2 w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLanguage("es")}
            className={classNames(
              "inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg transition-colors duration-200",
              {
                "bg-white text-primary-400": language === "es",
                "bg-gray-800 text-white hover:bg-gray-700 hover:text-primary-400": language !== "es",
              }
            )}
          >
            Es
            <img src="/logos/es-flag.png" className="ms-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="z-2 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row justify-between">
        <Header data={data.general} />
        <div className="lg:pl-[50%]">
          <About data={data.general} />
          <Experiences data={data.experiences} />
          <Education data={data.education} />
          <Volunteering data={data.volunteering} />
          <Projects data={data.projects} />
        </div>
      </div>
    </main>
  );
}
