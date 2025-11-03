"use client";

import React from "react";

type Props = {};

const HomeClient = (props: Props) => {
  return (
    <div className="w-full min-h-screen bg-neural">
      Home
      <div className="flex items-center gap-4 w-xl mx-auto">
        <button className="btn btn-primary">test</button>
        <button className="btn btn-secondary">test</button>
        <button className="btn btn-accent">test</button>
        <button className="btn btn-neutral">test</button>
      </div>
    </div>
  );
};

export default HomeClient;
