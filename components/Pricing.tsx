import React from "react";
import PriceCard from "./PriceCard";

export default async function Pricing() {
  return (
    <div className='bg-neutral-950 space-x-8 flex mx-auto justify-center py-20'>
      <PriceCard
        prevPrice={10}
        currentPrice={3}
        plan='Starter'
        include={["5 Videos to load", "Twitter", "Facebook"]}
        notInclude={[
          "Youtube",
          "Instagram",
          "2 Videos Per Hour",
          "Maximum Duration 1h",
        ]}
      />
      <PriceCard
        best
        prevPrice={30}
        currentPrice={5}
        include={[
          "50 Videos to load",
          "Twitter",
          "Facebook",
          "Youtube",
          "Instagram",
          "10 Videos Per Hour",
          "Maximum Duration 3h",
        ]}
        notInclude={[]}
        plan='Pro'
      />
      <PriceCard
        prevPrice={40}
        currentPrice={15}
        include={[
          "100 Videos to load",
          "Twitter",
          "Facebook",
          "Youtube",
          "Instagram",
          "20 Videos Per Hour",
          "Maximum Duration 3h",
        ]}
        notInclude={[]}
        plan='Maximal'
      />
    </div>
  );
}
