import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import generatedComponents from './generated_components_dump.json';
import ErrorBoundary from './ErrorBoundary';

export default function GeneratedComponentsList() {
  const [componentImports, setComponentImports] = useState([]);
  const navigateTo  = useNavigate();

  useEffect(() => {
    // Load child components dynamically based on the JSON data
    const imports = generatedComponents.openv0_components.map(async (item) => {
      // Construct the import path for each child component
      const importPath = `./openv0_generated/${item.name}/${item.versions.slice(-1)[0]}.tsx`;

      try {
        // Use dynamic import to load the component, and catch any errors
        let module
        try {
          module = await import(importPath);

        } catch(e) {
          return false
        }
        return {
          name: item.name,
          title: item.title,
          versions: item.versions.length,
          last_version: item.versions.slice(-1)[0],
          component: module.default,
        };
      } catch (error) {
        // Handle the error (e.g., log it)
        console.error(`Failed to import component for ${item.name}: ${error.message}`);
        // Return a placeholder component or null
        return false
      }
    });

    try {
      fetch(`http://localhost:3000/component/ping/?from=Home (Browse Components)`);
    }catch(e){
      console.log(e);
    }

    // Wait for all dynamic imports to complete
    Promise.all(imports).then((components) => {
      setComponentImports(components.filter(e=>e));
    });
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
        <div key={index} className="m-2 cursor-pointer border p-2 rounded rounded-xl"
          onClick={() => { navigateTo(`/view/?componentId=${item.name}`) }}>
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
