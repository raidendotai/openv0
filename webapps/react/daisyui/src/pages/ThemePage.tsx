import * as components from '@theme/index';
import ComponentContainer from '@ui/utils/ComponentContainer';
import type React from 'react';
import { type ReactElement } from 'react';

const ThemePage = () => {
  const spotlightComponets: Record<string, React.FC | ReactElement> = {
    /* Add components you want shown at the top */
    /* STILL IN DEVELOPMENT */
    Buttons: components.Buttons,
    Headings: components.Headings
  };

  function formatComponentName(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').trim();
  }

  return (
    <div className="p-4">
      <div className="masonry">
        {Object.entries(spotlightComponets).map(([key, value]) => {
          return (
            <ComponentContainer
              key={key}
              componentName={key}
              component={value}
            />
          );
        })}
        {Object.entries(components).map(([key, value]) => {
          if (!Object.values(spotlightComponets).includes(value)) {
            return (
              <ComponentContainer
                key={key}
                componentName={formatComponentName(key)}
                component={value}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ThemePage;
