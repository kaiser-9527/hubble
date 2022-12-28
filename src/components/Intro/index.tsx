import { Link } from "react-router-dom";

export default () => {
  return (
    <main className="container mx-auto py-10">
      <div className="text-center pt-32 text-txt-1">
        <h1 className="mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight">
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-[#3B82F6] lg:inline">
            Github Stars
          </span>
          <span> management</span>
          <br className="lg:block hidden" />
          <span> has never been easier</span>
        </h1>
        <h3 className="px-0 mb-6 text-lg text-color-100 md:text-2xl lg:px-24">
          Add tags and comment for each repo to find it easier
        </h3>
        <div className="flex-center gap-2">
          <Link
            to="/app"
            className="inline-block rounded-lg  hover:bg-primary-600 px-10 h-54px text-xl leading-54px bg-primary-500"
          >
            Try it now
          </Link>
          <a
            href="https://www.producthunt.com/posts/hubble-8?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hubble&#0045;8"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=372705&theme=neutral"
              alt="Hubble - Github&#0032;stars&#0032;management&#0032;tool | Product Hunt"
              className="w-250px h-54px"
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>
      <div className=" mt-10 ">
        <img
          src="/images/screen-shot.png"
          alt="hubble screen shot"
          className="mx-auto border-bd-1 rounded-lg shadow border"
        />
      </div>
    </main>
  );
};
