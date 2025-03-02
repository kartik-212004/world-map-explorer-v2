// File: pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const WorldMapExplorer: React.FC = () => {
  return (
    <>
      <Head>
        <title>World-Map-Explorer - User Manual</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="font-sans leading-relaxed mx-auto max-w-[60%] items-center text-lg scroll-smooth">
        <Image 
          id="logo" 
          src="/map-logo.png" 
          alt="Logo of World-Map-Explorer" 
          width={150} 
          height={150} 
          className="block mx-auto w-auto h-[150px] pt-[10px]"
        />
        <h1 className="my-[50px] text-[#2c3e50] text-center">World-Map-Explorer – Explore the world with ease</h1>

        <p>Welcome to <strong>World-Map-Explorer</strong>, an inclusive and educational mapping tool designed for both visually impaired and sighted users powered by OpenStreetMap. This manual provides an overview of the application&apos;s key features, ensuring that you have a seamless and engaging experience while exploring the world.</p>

        <h2 className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Contents:</h2>
        <ol>
          <li><a href="#feature-list" className="hover:underline">Feature list</a></li>
          <li><a href="#map-controls" className="hover:underline">Opening the map and getting started</a></li>
          <li><a href="#search-world" className="hover:underline">Search around the world</a></li>
          <li><a href="#How-to-Navigate" className="hover:underline">How to move through places</a></li>
          <li><a href="#zooming" className="hover:underline">Zooming</a></li>
          <li><a href="#inbound-navigation" className="hover:underline">Inbound navigation</a></li>
          <li><a href="#adjustable-pointer" className="hover:underline">Exploring the surroundings (Adjustable pointer)</a></li>
          <li><a href="#distance-finder" className="hover:underline">Finding distance</a></li>
          <li><a href="#credits" className="hover:underline">Credits</a></li>
        </ol>

        <h2 id="feature-list" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Feature list</h2>
        <ol>
          <li>
            Discover any location with ease using the search feature to explore countries, states, rivers, and historical monuments.
          </li>
          <li>
            Navigate the map effortlessly using arrow keys to move the cursor in any direction with the help of audio assist.
          </li>
          <li>
            Get real-time alerts when crossing borders, adding an interactive element to your journey.
          </li>
          <li>
            Instantly know the distance to borders in the north, south, east, and west at district, state, or country levels.
          </li>
          <li>
            Instantly access the altitude of your current cursor location
          </li>
          <li>
            Select a place to learn more about it, enhancing your exploration experience.
          </li>
          <li>
            Customize the distance and angle of a pointer to explore nearby locations with precision.
          </li>
          <li>
            Quickly reset the cursor position to your starting location with a single click.
          </li>
          <li>
            Receive the coordinates of your current location for an interactive experience.
          </li>
          <li>
            Zoom in and out with announcements, making navigation more accessible.
          </li>
          <li>
            Find the shortest distance between any two places with ease.
          </li>
          <li>
            Switch between political and geographical views to please your viewing experience
          </li>
        </ol>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="map-controls" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Opening the map and getting started</h2>
        <p>
          Type <strong>map.zendalona.com</strong> at the address bar on any browser to open the application (Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + D</code> to focus on address bar).<br />
          A description of the app with basic details window will appear. This include some desclaimers and basic controls such as how to turn on focus mode, how to focus on map 
          and how to access help screen which contain all the keys and their use.After going through these, close the window by using tab key to focus on the close button and pressing enter. <br />
          You will hear a sound indicating the loading of the map. Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + m</code> to focus on the map. After focusing on the map, turn on focus mode on your screen reader. The method to turn this on may vary depending on the screen reader. When focus mode is on, you can use keyboard and explore the world. <br />
          Use <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + K</code> to hear all the keys and their functions.
        </p>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="search-world" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Search around the world</h2>
        <p>Our global search feature lets you search any location with ease. Get information about countries, states, rivers, historical monuments and more.</p>
        <p>
          Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + S</code> to focus on search bar. Type the name of any place, river, state, country or even historic monuments. Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Enter</code> and choose a result from the list. Choose more results to explore even
          more options. The informations regarding the search will be displayed and announced. If you want to access the information one by one, use tab key to enter the information box and explore the 
          results using arrow keys. If you search for an area(with boundaries) such as a country, the region will the selected. The navigation will be limited within the borders of the selected place. This is to ensure
          that you stay oriented while exploring a specific area.
        </p>
        <p>
          To access information about the place, use tab key to access the information box. Then, use up and down arrow keys to switch through information. Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + M</code> to focus on map and continue navigation.(Note that this mode of navigation is limited within the selected place).
        </p>
        <p>
          Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Escape</code> to close this selection and continue normal navigation.
        </p>
        
        <div className="flex justify-center">
          <Image 
            src="/Greenland.png" 
            alt="Image of Search results when searched for Greenland. The country is selected and the cursor is inside it's boundary." 
            width={800} 
            height={600} 
            className="max-w-full h-auto mx-auto my-[10%]"
          />
        </div>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="How-to-Navigate" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">How to move through places</h2>
        <p>The map opens up with an cursor positioned on the your approximate location. Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">alt + M</code> to focus on the map. Turn on focus mode (The method to turn on focus mode varies depending on your screen reader.) and use arrow keys and keyboard shortcuts to navigate.</p>
        <div className="flex justify-center">
          <Image 
            src="/sweden.png" 
            alt="Image of Interactive cursor which is currently positioned in Sweden." 
            width={800} 
            height={600} 
            className="max-w-full h-auto mx-auto my-[10%]"
          />
        </div>
        <p>
          You will hear a sound on each arrow key press. When the cursor enters a water body, the sound of water splashing will be there. 
          When you cross a border, you will hear a seperate sound and an announcement regarding the place you come from and the place you are about to enter. When the arrow key press
          stops for a second, the current location of the cursor will be announced.
        </p>

        <p>You can infer several information while traversing using the following keys:</p>
        <ul className="list-disc ml-5">
          <li> 
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">F</code> to hear the cursor&apos;s current location.
          </li>
          <li>    
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Shift + Arrow Key</code> to find out the distance to the border in the arrow key&apos;s direction from the current cursor&apos;s position.
          </li>
          <li>
            press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">D</code> to hear the distance to the border east and west direction.
          </li>
          <li>
            Double press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">D</code> to hear the distance to the border in north and south direction.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">A</code> to announce the altittude of cursor&apos;s current location.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Enter</code> to select the cursor&apos;s location, highlighting it and showing more details on the left.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">L</code> to reset the cursor to your exact location. Note: You should enable location permission for the website.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Shift + F</code> to get the exact coordinates of the cursor.
          </li>        
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Z</code> to learn the scale of distance traveled by the cursor with each key press (varies by zoom level and latitude).
          </li>
        </ul>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="zooming" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Zooming</h2>
        <p>
          Zooming plays a crucial role in exploration. When you zoom in, the view shifts closer to the Earth&apos;s surface, reducing the area covered. 
          This is ideal for exploring smaller regions, such as local authorities or neighborhoods. On the other hand, zooming out provides a broader 
          perspective, making it suitable for viewing larger areas like states or entire countries. The level of zoom also affects the type of alerts you receive when crossing borders. At a closer zoom level, you&apos;ll be notified when crossing district boundaries. 
          Zooming out slightly will trigger alerts only when you cross state (or provincial) borders. At the widest zoom level, alerts are limited to crossing international borders. It is like viewing a place from a helicoptor. When you zoom out, the helicoptor rises up
          and you can view a bigger area. 
        </p>
        <p>
          Zoom level also affects the distance the cursor moves in one arrow key press. If you zoom in, this distance will be decrease. On maximum zoom in, the cursor only travels around 1 kilometer on a sing arrow key press.
          When you are maximum zoomed out. the cursor moves approximately 500 kilometers (This distance can vary depending on the lattitude of the place). So, if you want to navigate a large distance, zooming out would help you reduce the number of key presses.
        </p>

        <p>
          Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Z</code> to hear the distance traveled by the cursor with each arrow key press (this varies by zoom level and latitude).
        </p>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="inbound-navigation" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Inbound navigation (Navigate within a region)</h2>
        <p>
          <strong>Inbound navigation</strong> helps you stay within a selected place(such as a country) when you want to explore a specific area. 
          It ensures that you don&apos;t cross the boundary of the selected place.<br />
          You can enter inbound navigation in two ways. <br />
          1. When you search for a place in the search bar, if that place has boundaries (that is the place is not a point on map such as Taj Mahal), the place gets selected. (Note that this does not work when you search for rivers).<br />
          2. While you navigate using arrow keys, when you press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Enter</code>, the current location of the cursor gets selected.<br />
          When you select an area, you will hear an announcement that inbound navigation that The area of selection depends on the current zoom level. That is, if you are zoomed in, only a small place like a local authority will be selected, but when you are zoomed out, the large area such as a country can be selected.<br />
          When you select a place, the cursor is moved to the centre of the selected place and the navigation is limited within the area. When a cursor reaches a boundary, you will be warned that a boundary is reached. 
          You can hear the information about this place by using tab key to get to the informaion bar and using arrow keys to switch between informations.<br />
          Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + M</code> to focus on the map again and continue navigation.
        </p>
        
        <div className="flex items-start">
          <Image 
            src="/inbound.png" 
            alt="Image of Madagascar selected and selected by pressing enter while navigating." 
            width={400} 
            height={300} 
            className="max-w-[50%] h-auto mx-[10%] my-auto"
          />
        </div>

        <p>Note: Ensure you are focused on map and focus mode is on when using this feature. If you&apos;re using another feature, press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + M</code> to refocus. Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Escape</code> to exit the boundary and continue exploring.</p>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="adjustable-pointer" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Know your surroundings (Adjustable pointer)</h2>
        <p>
          The adjustable pointer adds an innovative twist to exploring and comparing distances on the map. Imagine you hold stick in your hand. You can point it to whichever direction you want and adjust the distance it points to by moving your hand. Adjustable pointer is like
          a stick who&apos;s length can be changed. With the current location as the centre, you can point to a place that is situated at a distance same as the length of the pointer and at an angle of your choice. Instead of moving your hands, you can use arrow keys to adjust it&apos;s length and angle. The north is set as 0 degree and as you rotate clockwise, the angle changes. 
          The east is 90 degree, south is 180 degree and west is 270 degree. In this way you can explore the surroundings of the cursor&apos;s location.
        </p>
        <div className="flex justify-center">
          <Image 
            src="/adpointer.png" 
            alt="Image of adjustable pointer pointing at central serbia." 
            width={800} 
            height={600} 
            className="max-w-full h-auto mx-auto my-[10%]"
          />
        </div>
        <h3 className="font-bold mt-4">How it works:</h3>
        <ul className="list-disc ml-5">
          <li>
            Focus on the map and press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">J</code> to activate adjustable pointer. Use <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Up and Down arrows</code> to change the length of the pointer 
            and <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Left and Right arrows</code> to adjust the angle in which it points.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">F</code> to announce the details of the place pointed by the adjustable pointer.
          </li>
          <li>
            Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Enter</code> to move the cursor to the location pointed by the cursor and continue normal navigation from there.
          </li>
          <li>
            press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">J</code> again to close adjustable pointer and continue normal navigation from where you stopped.
          </li>
        </ul>

        <p>Note: Ensure you are focused on map and focus mode is on when using this feature.</p>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <h2 id="distance-finder" className="mt-[30px] mx-[50px] text-[#2c3e50] border-b-2 border-[#2c3e50] pb-[5px]">Distance finder</h2>
        <p>The Distance Finder helps you calculate road distances between two locations (up to 1500 km). It provides both road distance and estimated travel time.</p>

        <p>
          Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Control +Shift + D</code> to open the distance finder panel. Use tab to focus on the text boxes of starting point and destination and input the places. 
          To select a place, type the name of the place and press Enter. This will bring the results based on your search. Select a place from the result and press enter to select it. You can select the cursor&apos;s current location as starting point or destination by pressing <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Alt + L</code>. 
          Use tab key to focus of find distance button and press enter to announce the distance and time. The screen reader will announce the total road distance between the two points and the estimated time taken for the travel.<br />
          Note: These values may not be accurate.
        </p>
        <div className="flex justify-center">
          <Image 
            src="/distancefinder.png" 
            alt="Image of rode route betwen Rome and Napoli which are places in Italy." 
            width={800} 
            height={600} 
            className="max-w-full h-auto mx-auto my-[10%]"
          />
        </div>

        <p>Note: Press <code className="bg-[#f4f4f4] px-1 py-0.5 rounded">Escape</code> to quickly close and return to exploring.</p>
        <p>To know more <a href="http://www.zendalona.com/map" className="no-underline">www.zendalona.com/map</a></p>
        <p>This application uses OpenStreetMap (OSM) data for map information. OSM is responsible for the maintenance and accuracy of the map</p>
        <Link href="#top" className="text-inherit no-underline">
          <button className="w-full">Go to top</button>
        </Link>

        <footer className="text-base w-[140%] bg-no-repeat bg-center bg-cover ml-[-20%]">
          <h1 id="credits" className="text-center text-[2rem] border-b-2 border-[#2c3e50]">Credits</h1>
          <p className="text-sm">- All are listed in alphabetic order</p>

          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-3 align-top text-center">Developers</th>
                <th className="p-3 align-top text-center">Mentors</th>
                <th className="p-3 align-top text-center">Testers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-top p-3 text-center">
                  <ul className="list-none m-0 p-0">
                    <li>Athuldas S</li>
                    <li>Azhar Abdulla C K</li>
                    <li>Jyothir Adithya P</li>
                    <li>Saju Suresh S</li>
                  </ul>
                </td>
                <td className="align-top p-3 text-center">
                  <ul className="list-none m-0 p-0">
                    <li>Aswathy Palakkal</li>
                    <li>Dr. Rani M R</li>
                    <li>K Sathyaseelan</li>
                    <li>Mukundhan Annamalai</li>
                    <li>Nalin Sathyan</li>
                  </ul>
                </td>
                <td className="align-top p-3 text-center">
                  <ul className="list-none m-0 p-0">
                    <li>Abhiram P S</li>
                    <li>Ajayakumar A</li>
                    <li>Akshay S Dinesh</li>
                    <li>Balaraman P</li>
                    <li>Jinu John</li>
                    <li>K H Musthafal Mukthar</li>
                    <li>K Sathyaseelan</li>
                    <li>Shadil A M</li>
                    <li>Vinod B</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-6 gap-3 justify-center items-center pt-[10%]">
            {/* Logos would go here */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default WorldMapExplorer;