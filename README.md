# News Aggregator

An aggregator to curate news articles from 3 different sources and enjoy a simplified access to latest news and headlines

## Performance Optimisations & UI/UX:

1. Implemented infinite scroll
   - Used paginated APIs
   - Tracks current page, loading state, last page reached state of each source
   - Programmatically detect when the page scroll is almost about to end, using Intersection Observer
2. Lazy loading of Images
   - Used Intersection Observer to detect, when a news article is about to enter the viewport and then initiate image load.
   - All news articles use single instance of Intersection Observer
   - Hence, it reduced the heaviness in page load time and the number of initial network requests
3. Implemented debounce for Search. So, there is a fine balance between faster results and the number of network calls.
4. Additional improvement to images
   - Handled image download error and image URL not available cases, by providing a fallback
   - Each news article could have different aspect ratio. Handled it, by having a cropped blurry image in the background and overlayed an uncropped image on top. So, users don't loose any area of the image. Provides a clean UI with all news articles having the same aspect ratio
   - Even though there are two instances of same image in UI. But, only one network call is needed to get the image
5. Desktop and Mobile friendly design
   - The page is completely responsive
   - Suports both portrait and landcape roatation of mobiles and tablets
   - Used relative css units which adapt to different screen sizes and pixel density
   - Used media queries where different behavior was needed for Desktop and Mobile devices
6. Themes and Dark mode can be easily added
   - Used Material UI design system which supports theming and dark mode switches
   - Very minimal instances of colors directed specified in CSS

## Get Started 🚀

### A. Published on internet:

The production build is published on the internet using Github pages. Please access through the link https://harshithmjh.github.io

### B. Docker container:

1. Clone the project to your machine  
   `git clone https://github.com/HarshithMjh/news-aggregator.git`
2. Navigate to the news-aggregator folder  
   `cd news-aggregator`
3. Build docker image with any name and tag. Eg: news-aggregator:v1.0.0  
   `docker build -t news-aggregator:v1.0.0 .`
4. Link the host port 3000 to the container port 3000 and run the docker image in a container  
   `docker run -p 3000:3000 news-aggregator:v1.0.0`
5. Open the following URL in your browser to see the web application  
   `http://localhost:3000`

### C. Using NodeJS on your machine:

1. Install NodeJS version 22.14 to your machine directly or through Node Version Manager
2. Clone the project to your machine  
   `git clone https://github.com/HarshithMjh/news-aggregator.git`
3. Navigate to the news-aggregator folder  
   `cd news-aggregator`
4. Install the packages using node version 22.14  
   `npm i`
5. Start the development server on default port 5173  
   `npm run dev`
6. Open the following URL in your browser to see the web application  
   `http://localhost:5173`
