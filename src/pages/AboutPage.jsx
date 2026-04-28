function AboutPage() {
  return (
    <main className="container">
      <section className="about-page about-page-featured">
        <p className="eyebrow">About the project</p>
        <h2>MovieApp KC started as a simple movie shelf.</h2>
        <p>
          It was made to feel like a page a person would actually use: quick to scan, easy to open,
          and calm enough to browse when you are trying to decide what to watch.
        </p>
        <p>
          The collection mixes local picks with TMDB data, so the app still works even if the API is
          unavailable. Trailer buttons, watch links, and movie details are there to keep the path
          from curiosity to choice short and simple.
        </p>
        <div className="about-notes">
          <div>
            <h3>What it does well</h3>
            <p>Search, genre filtering, sorting, detailed views, trailers, and quick external links.</p>
          </div>
          <div>
            <h3>What it tries to feel like</h3>
            <p>A real shelf of movies with a few opinionated touches, not a machine-generated catalog.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
