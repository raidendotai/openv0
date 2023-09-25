import React, { type FunctionComponent, type ReactElement } from 'react';

interface ComponentContainerProps {
  componentName: string;
  component: React.FC | ReactElement;
}

function ComponentContainer({
  componentName,
  component
}: ComponentContainerProps): ReactElement {
  return (
    <>
      <section
        className={
          'mb-5 h-full w-full break-inside-avoid-column space-y-2.5 rounded-xl bg-[#D9D9D9] bg-opacity-10 p-5'
        }
      >
        <p>{componentName}</p>
        <div>
          {React.isValidElement(component)
            ? component
            : React.createElement(component as FunctionComponent)}
        </div>
      </section>
    </>
  );
}

export default ComponentContainer;
