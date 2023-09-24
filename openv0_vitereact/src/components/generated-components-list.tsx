import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { cn } from '@/lib/utils';
// import generatedComponents from './generated_components_dump.json';
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
//@ts-ignore
import * as components from "virtual:components.tsx";

export default function GeneratedComponentsList() {
  const [componentImports, setComponentImports] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const getComponents = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/components`
        );
        const compoments = data.filter(
          (component, index, arr) =>
            arr.findIndex((c) => c.componentId === component.componentId) ===
            index
        );
        const imports = compoments.map(async (item) => {
          const versions = data
            .filter((component) => component.componentId === item.componentId)
            .sort();
          return {
            title: item.name,
            name: item.componentId,
            versions: versions.length,
            last_version: versions.slice(-1)[0],
            component: components[`${item.componentId}_${item.version}`],
          };
        });
        setComponentImports(await Promise.all(imports));
      } catch (error) {
        console.log(error);
      }
    };

    getComponents();
  }, []);

  function renderComponentSafely(Component) {
    try {
      return <Component />;
    } catch (error) {
      // Handle the error gracefully, e.g., log it or show an error message
      console.error("Error rendering component:", error);
      return <div>Error rendering component</div>; // You can customize the error message here
    }
  }

  return (
    <div className="grid xl:grid-cols-3">
      {componentImports.map((item, index) => (
        <div
          key={index}
          className="m-2 cursor-pointer border p-2 rounded rounded-xl"
          onClick={() => {
            navigateTo(`/view/?componentId=${item.name}`);
          }}
        >
          <div className="p-2 my-2 mt-0 pt-1 mb-0 border-b border-opacity-10 text-base cursor-pointer hover:pl-4 duration-200">
            <p className="font-bold break-words">{item.title} &nbsp;→</p>
            <p className="text-xs">{item.versions} version(s)</p>
          </div>
          <div className="cursor-pointer p-3 hover:-m-1 duration-200 scale-90 max-h-56 max-w-xs sm:max-w-sm md:max-w-xl overflow-hidden shadow-xl rounded rounded-xl">
            <ErrorBoundary>
              {renderComponentSafely(item.component)}
            </ErrorBoundary>
          </div>
        </div>
      ))}
    </div>
  );
}
