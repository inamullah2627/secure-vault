import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Password Security Guides | SecureVault Blog",
  description: "Clear, practical guides about strong passwords, password managers, online privacy and staying safe online.",
};

export const instant = false;

const categories = ["Strong Passwords", "Password Managers", "Online Privacy", "Security Basics", "Product Updates"];

const articles = [
  ["Strong Passwords", "[Article title]", "[One-line summary]"],
  ["Password Managers", "[Article title]", "[One-line summary]"],
  ["Online Privacy", "[Article title]", "[One-line summary]"],
  ["Security Basics", "[Article title]", "[One-line summary]"],
  ["Product Updates", "[Article title]", "[One-line summary]"],
  ["Strong Passwords", "[Article title]", "[One-line summary]"],
];

const popularGuides = ["[Guide title one]", "[Guide title two]", "[Guide title three]"];

function ArticleCard({ category, title, summary }: { category: string; title: string; summary: string }) {
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleImage}>[Article image]</div>
      <div className={styles.articleBody}>
        <span className={styles.tag}>{category}</span>
        <h3>{title}</h3>
        <p>{summary}</p>
        <small>Updated [date] · [Author]</small>
      </div>
    </article>
  );
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const query = await searchParams;
  const search = Array.isArray(query.search) ? query.search[0] ?? "" : query.search ?? "";
  const category = Array.isArray(query.category) ? query.category[0] ?? "" : query.category ?? "";
  const term = search.trim().toLocaleLowerCase();
  const visibleArticles = articles.filter(([articleCategory, title, summary]) => {
    const categoryMatches = !category || articleCategory === category;
    const searchMatches = !term || `${articleCategory} ${title} ${summary}`.toLocaleLowerCase().includes(term);
    return categoryMatches && searchMatches;
  });

  return (
    <div className={styles.site}>
      <SiteHeader active="/blog" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span>
      </nav>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Password Security Guides</h1>
          <p>Clear, practical answers to real questions about passwords, privacy and staying safe online.</p>
          <form className={styles.search} action="/blog" method="get" role="search">
            <label htmlFor="blog-search">Search guides</label>
            <input id="blog-search" name="search" type="search" placeholder="Search guides" defaultValue={search} />
          </form>
        </section>

        <nav className={styles.categories} aria-label="Guide categories">
          <Link className={!category ? styles.activeCategory : undefined} href="/blog">All</Link>
          {categories.map((item) => (
            <Link className={category === item ? styles.activeCategory : undefined} href={`/blog?category=${encodeURIComponent(item)}`} key={item}>{item}</Link>
          ))}
        </nav>

        <div className={styles.contentLayout}>
          <div>
            <article className={styles.featured}>
              <div className={styles.featuredImage}>[Featured image]</div>
              <div className={styles.featuredBody}>
                <span className={styles.tag}>Featured · Strong Passwords</span>
                <h2>[Featured article title]</h2>
                <p>[Two-line summary that answers one specific question.]</p>
                <small>Updated [date] · [Author]</small>
              </div>
            </article>

            {visibleArticles.length ? (
              <div className={styles.articleGrid}>
                {visibleArticles.slice(0, 3).map(([articleCategory, title, summary], index) => (
                  <ArticleCard category={articleCategory} title={title} summary={summary} key={`${articleCategory}-${index}`} />
                ))}

                {/*
                  AD SLOT — Blog in-feed responsive placement
                  Keep this exact position between article rows for the future ad component.
                  Ads are intentionally disabled for now.
                */}

                {visibleArticles.slice(3).map(([articleCategory, title, summary], index) => (
                  <ArticleCard category={articleCategory} title={title} summary={summary} key={`${articleCategory}-${index + 3}`} />
                ))}
              </div>
            ) : <p className={styles.empty}>No guides matched your search.</p>}

            <nav className={styles.pagination} aria-label="Blog pagination">
              <span>Previous</span><strong aria-current="page">1</strong><Link href="/blog?page=2">2</Link><Link href="/blog?page=3">3</Link><Link href="/blog?page=2">Next</Link>
            </nav>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.popularCard}>
              <h2>Popular guides</h2>
              {popularGuides.map((guide) => <Link href="/blog/how-to-create-a-strong-password" key={guide}>{guide}</Link>)}
            </section>

            {/*
              AD SLOT — Blog 300x600 sidebar placement
              Keep this exact position below Popular guides for the future ad component.
              Ads are intentionally disabled for now.
            */}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
