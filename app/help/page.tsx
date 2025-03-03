// File: pages/index.tsx
import React, { useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Constants for better organization
const CONTENT_SECTIONS = [
  {
    id: "feature-list",
    title: "Feature list",
  },
  {
    id: "map-controls",
    title: "Map controls",
  },
  {
    id: "search-world",
    title: "Search around the world",
  },
  {
    id: "How-to-Navigate",
    title: "How to move through places",
  },
  {
    id: "zooming",
    title: "Zooming",
  },
  {
    id: "inbound-navigation",
    title: "Inbound navigation",
  },
  {
    id: "adjustable-pointer",
    title: "Know your surroundings",
  },
  {
    id: "distance-finder",
    title: "Distance finder",
  },
];

// Component for keyboard shortcuts to ensure consistent styling
const KeyboardShortcut = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">{children}</code>
);

// Component for section headings
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]"
  >
    {children}
  </h2>
);

// Component for "Back to Top" button
const BackToTop = () => (
  <Link href="#top" className="text-inherit no-underline">
    <button className="w-full my-4 py-2 bg-[#e7e7e7] hover:bg-[#d7d7d7] rounded transition-colors">
      Go to top
    </button>
  </Link>
);

// Credits table component
const CreditsTable = () => {
  const credits = {
    developers: ["Athuldas S", "Azhar Abdulla C K", "Jyothir Adithya P", "Saju Suresh S"],
    mentors: [
      "Aswathy Palakkal", 
      "Dr. Rani M R", 
      "K Sathyaseelan", 
      "Mukundhan Annamalai", 
      "Nalin Sathyan"
    ],
    testers: [
      "Abhiram P S",
      "Ajayakumar A",
      "Akshay S Dinesh",
      "Balaraman P",
      "Jinu John",
      "K H Musthafal Mukthar",
      "K Sathyaseelan",
      "Shadil A M",
      "Vinod B",
    ],
  };

  return (
    <table className="w-full text-center border-collapse">
      <thead>
        <tr>
          {Object.keys(credits).map((category) => (
            <th key={category} className="p-3 align-top text-center capitalize">
              {category}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.values(credits).map((people, index) => (
            <td key={index} className="align-top p-3 text-center">
              <ul className="list-none m-0 p-0">
                {people.map((person) => (
                  <li key={person}>{person}</li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const WorldMapExplorer: React.FC = () => {
  // Using useMemo to optimize the rendering
  const contentLinks = useMemo(() => 
    CONTENT_SECTIONS.map((section) => (
      <li className="text-blue-700 underline mb-2" key={section.id}>
        <Link href={`#${section.id}`}>{section.title}</Link>
      </li>
    )), 
  []);

  return (
    <>
      <Head>
        <title>World-Map-Explorer - User Manual</title>
        <meta name="description" content="User manual for World-Map-Explorer, an inclusive and educational mapping tool." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-sans leading-relaxed mx-auto max-w-[60%] md:max-w-[80%] sm:max-w-[90%] items-center text-lg scroll-smooth">
        <a id="top" className="sr-only focus:not-sr-only">Top of page</a>
        
        <header className="mt-4 mb-12 text-center">
          <Image
            id="logo"
            src="/map-logo.png"
            alt="Logo of World-Map-Explorer"
            width={150}
            height={150}
            className="block mx-auto w-auto h-[150px] pt-[10px]"
            priority
          />
          <h1 className="my-[50px] text-[#2c3e50]">
            World-Map-Explorer – Explore the world with ease
          </h1>
        </header>

        <section className="introduction mb-8">
          <p>
            Welcome to <strong>World-Map-Explorer</strong>, an inclusive and
            educational mapping tool designed for both visually impaired and
            sighted users powered by OpenStreetMap. This manual provides an
            overview of the application&apos;s key features, ensuring that you
            have a seamless and engaging experience while exploring the world.
          </p>
        </section>

        <nav aria-labelledby="table-of-contents">
          <h2 id="table-of-contents" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">
            Contents:
          </h2>
          <ol className="space-y-1">{contentLinks}</ol>
        </nav>

        <main>
          <section aria-labelledby="feature-list">
            <SectionHeading id="feature-list">Feature list</SectionHeading>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Discover any location with ease using the search feature to explore
                countries, states, rivers, and historical monuments.
              </li>
              <li>
                Navigate the map effortlessly using arrow keys to move the cursor in
                any direction with the help of audio assist.
              </li>
              <li>
                Get real-time alerts when crossing borders, adding an interactive
                element to your journey.
              </li>
              <li>
                Instantly know the distance to borders in the north, south, east,
                and west at district, state, or country levels.
              </li>
              <li>Instantly access the altitude of your current cursor location.</li>
              <li>
                Select a place to learn more about it, enhancing your exploration
                experience.
              </li>
              <li>
                Customize the distance and angle of a pointer to explore nearby
                locations with precision.
              </li>
              <li>
                Quickly reset the cursor position to your starting location with a
                single click.
              </li>
              <li>
                Receive the coordinates of your current location for an interactive
                experience.
              </li>
              <li>
                Zoom in and out with announcements, making navigation more
                accessible.
              </li>
              <li>Find the shortest distance between any two places with ease.</li>
              <li>
                Switch between political and geographical views to enhance your
                viewing experience.
              </li>
            </ol>
            <BackToTop />
          </section>

          <section aria-labelledby="map-controls">
            <SectionHeading id="map-controls">
              Opening the map and getting started
            </SectionHeading>
            <p>
              Type <strong>map.zendalona.com</strong> in the address bar of any
              browser to open the application (Press{" "}
              <KeyboardShortcut>Alt + D</KeyboardShortcut> to
              focus on address bar).
            </p>
            <p>
              A description window with basic details will appear, including disclaimers 
              and controls such as how to turn on focus mode, how to focus on the map, 
              and how to access the help screen containing all keys and their uses. 
              Close this window by using the tab key to focus on the close button 
              and pressing enter.
            </p>
            <p>
              You will hear a sound indicating the map is loading. Press{" "}
              <KeyboardShortcut>Alt + M</KeyboardShortcut> to
              focus on the map. After focusing on the map, turn on focus mode on
              your screen reader. The method to turn this on may vary depending on
              the screen reader. When focus mode is on, you can use the keyboard to
              explore the world.
            </p>
            <p>
              Use <KeyboardShortcut>Alt + K</KeyboardShortcut> to
              hear all the keys and their functions.
            </p>
            <BackToTop />
          </section>

          <section aria-labelledby="search-world">
            <SectionHeading id="search-world">
              Search around the world
            </SectionHeading>
            <p>
              Our global search feature lets you search any location with ease. Get
              information about countries, states, rivers, historical monuments and
              more.
            </p>
            <p>
              Press <KeyboardShortcut>Alt + S</KeyboardShortcut> to
              focus on the search bar. Type the name of any place, river, state, country,
              or even historic monuments. Press <KeyboardShortcut>Enter</KeyboardShortcut> and
              choose a result from the list. Choose more results to explore even
              more options. Information regarding the search will be displayed
              and announced. If you want to access the information one by one, use
              the tab key to enter the information box and explore the results using
              arrow keys. If you search for an area (with boundaries) such as a
              country, the region will be selected. Navigation will be limited
              within the borders of the selected place to ensure that you
              stay oriented while exploring a specific area.
            </p>
            <p>
              To access information about the place, use the tab key to access the
              information box. Then, use up and down arrow keys to switch through
              information. Press <KeyboardShortcut>Alt + M</KeyboardShortcut> to
              focus on the map and continue navigation (Note that this mode of
              navigation is limited within the selected place).
            </p>
            <p>
              Press <KeyboardShortcut>Escape</KeyboardShortcut> to
              close this selection and continue normal navigation.
            </p>

            <figure className="flex justify-center my-10">
              <Image
                src="/Greenland.png"
                alt="Search results when searching for Greenland. The country is selected and the cursor is inside its boundary."
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="sr-only">
                Search results showing Greenland selected with the cursor inside its boundary
              </figcaption>
            </figure>
            <BackToTop />
          </section>

          <section aria-labelledby="How-to-Navigate">
            <SectionHeading id="How-to-Navigate">
              How to move through places
            </SectionHeading>
            <p>
              The map opens with a cursor positioned at your approximate
              location. Press <KeyboardShortcut>Alt + M</KeyboardShortcut> to
              focus on the map. Turn on focus mode (the method varies depending on your screen reader) 
              and use arrow keys and keyboard shortcuts to navigate.
            </p>
            <figure className="flex justify-center my-10">
              <Image
                src="/sweden.png"
                alt="Interactive cursor positioned in Sweden"
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="sr-only">
                Interactive cursor positioned in Sweden
              </figcaption>
            </figure>
            <p>
              You will hear a sound with each arrow key press. When the cursor enters
              a water body, you'll hear water splashing. When you cross a border, 
              you'll hear a distinct sound and an announcement 
              about the place you're leaving and the place you're entering. When arrow key 
              presses stop for a second, the current cursor location will be announced.
            </p>

            <p>
              You can gather several types of information while traversing using the following
              keys:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Press <KeyboardShortcut>F</KeyboardShortcut> to
                hear the cursor&apos;s current location.
              </li>
              <li>
                Press <KeyboardShortcut>Shift + Arrow Key</KeyboardShortcut> to
                find out the distance to the border in the arrow key&apos;s
                direction from the current cursor&apos;s position.
              </li>
              <li>
                Press <KeyboardShortcut>D</KeyboardShortcut> to
                hear the distance to the border in east and west directions.
              </li>
              <li>
                Double press <KeyboardShortcut>D</KeyboardShortcut> to hear
                the distance to the border in north and south directions.
              </li>
              <li>
                Press <KeyboardShortcut>A</KeyboardShortcut> to
                announce the altitude of the cursor&apos;s current location.
              </li>
              <li>
                Press <KeyboardShortcut>Enter</KeyboardShortcut> to
                select the cursor&apos;s location, highlighting it and showing more
                details on the left.
              </li>
              <li>
                Press <KeyboardShortcut>L</KeyboardShortcut> to
                reset the cursor to your exact location. Note: You should enable
                location permission for the website.
              </li>
              <li>
                Press <KeyboardShortcut>Shift + F</KeyboardShortcut> to
                get the exact coordinates of the cursor.
              </li>
              <li>
                Press <KeyboardShortcut>Z</KeyboardShortcut> to
                learn the scale of distance traveled by the cursor with each key
                press (varies by zoom level and latitude).
              </li>
            </ul>
            <BackToTop />
          </section>

          <section aria-labelledby="zooming">
            <SectionHeading id="zooming">Zooming</SectionHeading>
            <p>
              Zooming plays a crucial role in exploration. When you zoom in, the
              view shifts closer to the Earth&apos;s surface, reducing the area
              covered. This is ideal for exploring smaller regions, such as local
              authorities or neighborhoods. On the other hand, zooming out provides
              a broader perspective, making it suitable for viewing larger areas
              like states or entire countries. The zoom level also affects
              the type of alerts you receive when crossing borders. At a closer zoom
              level, you&apos;ll be notified when crossing district boundaries.
              Zooming out slightly will trigger alerts only when you cross state (or
              provincial) borders. At the widest zoom level, alerts are limited to
              crossing international borders. It&apos;s like viewing a place from a
              helicopter. When you zoom out, the helicopter rises up and you can
              view a bigger area.
            </p>
            <p>
              Zoom level also affects the distance the cursor moves with one arrow key
              press. If you zoom in, this distance will decrease. At maximum zoom
              in, the cursor only travels around 1 kilometer on a single arrow key
              press. At maximum zoom out, the cursor moves approximately
              500 kilometers (this distance can vary depending on the latitude of
              the place). So, if you want to navigate a large distance, zooming out
              would help you reduce the number of key presses.
            </p>

            <p>
              Press <KeyboardShortcut>Z</KeyboardShortcut> to
              hear the distance traveled by the cursor with each arrow key press
              (this varies by zoom level and latitude).
            </p>
            <BackToTop />
          </section>

          <section aria-labelledby="inbound-navigation">
            <SectionHeading id="inbound-navigation">
              Inbound navigation (Navigate within a region)
            </SectionHeading>
            <p>
              <strong>Inbound navigation</strong> helps you stay within a selected
              place (such as a country) when you want to explore a specific area. It
              ensures that you don&apos;t cross the boundary of the selected place.
            </p>
            <p>You can enter inbound navigation in two ways:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                When you search for a place in the search bar, if that place has
                boundaries (that is, the place is not a point on the map such as Taj
                Mahal), the place gets selected. (Note that this does not work when
                you search for rivers).
              </li>
              <li>
                While navigating using arrow keys, when you press <KeyboardShortcut>Enter</KeyboardShortcut>,
                the current location of the cursor gets selected.
              </li>
            </ol>
            <p>
              When you select an area, you will hear an announcement about inbound navigation.
              The area of selection depends on the current zoom
              level. If you are zoomed in, only a small place like a local
              authority will be selected, but when you are zoomed out, a large
              area such as a country can be selected.
            </p>
            <p>
              When you select a place, the cursor moves to the center of the
              selected place and navigation is limited within the area. When the
              cursor reaches a boundary, you will be warned that a boundary is
              reached. You can hear information about this place by using the tab
              key to get to the information bar and using arrow keys to switch
              between information items.
            </p>
            <p>
              Press <KeyboardShortcut>Alt + M</KeyboardShortcut> to
              focus on the map again and continue navigation.
            </p>

            <figure className="flex justify-center my-10">
              <Image
                src="/inbound.png"
                alt="Madagascar selected by pressing enter while navigating"
                width={400}
                height={300}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="sr-only">
                Madagascar selected and highlighted on the map
              </figcaption>
            </figure>

            <p>
              Note: Ensure you are focused on the map and focus mode is on when using
              this feature. If you&apos;re using another feature, press <KeyboardShortcut>Alt + M</KeyboardShortcut> to
              refocus. Press <KeyboardShortcut>Escape</KeyboardShortcut> to
              exit the boundary and continue exploring.
            </p>
            <BackToTop />
          </section>

          <section aria-labelledby="adjustable-pointer">
            <SectionHeading id="adjustable-pointer">
              Know your surroundings (Adjustable pointer)
            </SectionHeading>
            <p>
              The adjustable pointer adds an innovative twist to exploring and
              comparing distances on the map. Imagine you hold a stick in your hand.
              You can point it in whichever direction you want and adjust the
              distance it points to by moving your hand. The adjustable pointer is like
              a stick whose length can be changed. With the current location as
              the center, you can point to a place that is situated at a distance
              equal to the length of the pointer and at an angle of your choice.
              Instead of moving your hands, you can use arrow keys to adjust
              its length and angle. North is set as 0 degrees, and as you
              rotate clockwise, the angle changes. East is 90 degrees, south is
              180 degrees, and west is 270 degrees. In this way, you can explore the
              surroundings of the cursor&apos;s location.
            </p>
            <figure className="flex justify-center my-10">
              <Image
                src="/adpointer.png"
                alt="Adjustable pointer pointing at central Serbia"
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="sr-only">
                Adjustable pointer pointing at central Serbia
              </figcaption>
            </figure>
            <h3 className="font-bold mt-4">How it works:</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Focus on the map and press <KeyboardShortcut>J</KeyboardShortcut> to
                activate the adjustable pointer. Use <KeyboardShortcut>Up and Down arrows</KeyboardShortcut> to
                change the length of the pointer and <KeyboardShortcut>Left and Right arrows</KeyboardShortcut> to
                adjust the angle in which it points.
              </li>
              <li>
                Press <KeyboardShortcut>F</KeyboardShortcut> to
                announce the details of the place pointed to by the adjustable pointer.
              </li>
              <li>
                Press <KeyboardShortcut>Enter</KeyboardShortcut> to
                move the cursor to the location pointed to by the pointer and continue
                normal navigation from there.
              </li>
              <li>
                Press <KeyboardShortcut>J</KeyboardShortcut> again to
                close the adjustable pointer and continue normal navigation
                from where you stopped.
              </li>
            </ul>

            <p>
              Note: Ensure you are focused on the map and focus mode is on when using
              this feature.
            </p>
            <BackToTop />
          </section>

          <section aria-labelledby="distance-finder">
            <SectionHeading id="distance-finder">Distance finder</SectionHeading>
            <p>
              The Distance Finder helps you calculate road distances between two
              locations (up to 1500 km). It provides both road distance and
              estimated travel time.
            </p>

            <p>
              Press <KeyboardShortcut>Control + Shift + D</KeyboardShortcut> to
              open the distance finder panel. Use tab to focus on the text boxes
              for starting point and destination and input the places. To select a
              place, type the name of the place and press Enter. This will bring results
              based on your search. Select a place from the results and press
              enter to select it. You can select the cursor&apos;s current location
              as the starting point or destination by pressing <KeyboardShortcut>Alt + L</KeyboardShortcut>. 
              Use the tab key to focus on the "find distance" button and press enter to announce
              the distance and time. The screen reader will announce the total road
              distance between the two points and the estimated travel time.
            </p>
            <p className="text-gray-600 italic">
              Note: These values may not be accurate.
            </p>
            
            <figure className="flex justify-center my-10">
              <Image
                src="/distancefinder.png"
                alt="Road route between Rome and Napoli in Italy"
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="sr-only">
                Map showing the road route between Rome and Napoli in Italy
              </figcaption>
            </figure>

            <p>
              Note: Press <KeyboardShortcut>Escape</KeyboardShortcut> to
              quickly close and return to exploring.
            </p>
            <p>
              To learn more, visit{" "}
              <a 
                href="http://www.zendalona.com/map" 
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.zendalona.com/map
              </a>
            </p>
            <p>
              This application uses OpenStreetMap (OSM) data for map information.
              OSM is responsible for the maintenance and accuracy of the map.
            </p>
            <BackToTop />
          </section>
        </main>

        <footer className="mt-12 pt-8 border-t-2 border-[#2c3e50]">
          <h2 id="credits" className="text-center text-[2rem] border-b-2 border-[#2c3e50]">
            Credits
          </h2>
          <p className="text-sm italic">- All are listed in alphabetical order</p>

          <CreditsTable />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 justify-center items-center pt-[10%]">
            {/* Logos would go here */}
          </div>
          
          <p className="text-center text-sm mt-8 pb-4">
            © {new Date().getFullYear()} World-Map-Explorer. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default WorldMapExplorer;