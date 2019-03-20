import React from 'react';

const ToolBarOptionsContext = React.createContext({});

export const ToolBarOptionsProvider = ToolBarOptionsContext.Provider;
export const ToolBarOptionsConsumer = ToolBarOptionsContext.Consumer;