import React from "react";
import Album from "./home-page"

export default function HomePage() {
  return (
    <div>
          <Album inputFilter={{
            sold: true,
            category: [], size: [],
            color: [], condition: []
          }}/>
    </div>
  )
}
