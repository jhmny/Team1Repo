import React from "react";
import Album from "./home-page"

export default function HomePage() {
  return (
    <div>
          <Album inputFilter={{
            sold: false,
            category: [], size: [],
            color: [], condition: []
          }}/>
    </div>
  )
}
