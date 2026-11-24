import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import { getPublishedPosts, type BlogImage, type BlogPost } from "@/content/blog-posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Password Security Guides | SecureVault Blog",
  description: "Clear, practical guides about strong passwords, password managers, online privacy and staying safe online.",
};

export const instant = false;
const postsPerPage = 6;

function ResponsiveImage({ image, placeholder, priority = false }: { image?: BlogImage; placeholder: string; priority?: boolean }) {
  return image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} /> : <span>{placeholder}</span>;
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className={styles.articleCard}>
      <Link className={styles.articleImage} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        <ResponsiveImage image={post.featuredImage} placeholder="[Article image]" />
      </Link>
      <div className={styles.articleBody}>
        <span className={styles.tag}>{post.category}</span>
        <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.summary}</p>
        <small>Updated {post.updated} · {post.author.name}</small>
      </div>
    </article>
  );
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const query = await searchParams;
  const search = Array.isArray(query.search) ? query.search[0] ?? "" : query.search ?? "";
  const category = Array.isArray(query.category) ? query.category[0] ?? "" : query.category ?? "";
  const requestedPage = Number(Array.isArray(query.page) ? query.page[0] : query.page) || 1;
  const term = search.trim().toLocaleLowerCase();
  const publishedPosts = getPublishedPosts();
  const categories = [...new Set(publishedPosts.map((post) => post.category))];
  const filteredPosts = publishedPosts.filter((post) => {
    const categoryMatches = !category || post.category === category;
    const searchMatches = !term || `${post.category} ${post.title} ${post.summary} ${post.excerpt}`.toLocaleLowerCase().includes(term);
    return categoryMatches && searchMatches;
  });
  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  const remainingPosts = filteredPosts.filter((post) => post.slug !== featuredPost?.slug);
  const totalPages = Math.max(1, Math.ceil(remainingPosts.length / postsPerPage));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const pagePosts = remainingPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  const popularPosts = publishedPosts.slice(0, 3);

  return (
    <div className={styles.site}>
      <SiteHeader active="/blog" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>

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
          {categories.map((item) => <Link className={category === item ? styles.activeCategory : undefined} href={`/blog?category=${encodeURIComponent(item)}`} key={item}>{item}</Link>)}
        </nav>

        <div className={styles.contentLayout}>
          <div>
            {featuredPost ? (
              <article className={styles.featured}>
                <Link className={styles.featuredImage} href={`/blog/${featuredPost.slug}`} aria-label={`Read ${featuredPost.title}`}>
                  <ResponsiveImage image={featuredPost.featuredImage} placeholder="[Featured image]" priority />
                </Link>
                <div className={styles.featuredBody}>
                  <span className={styles.tag}>Featured · {featuredPost.category}</span>
                  <h2><Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link></h2>
                  <p>{featuredPost.summary}</p>
                  <small>Updated {featuredPost.updated} · {featuredPost.author.name}</small>
                </div>
              </article>
            ) : <p className={styles.empty}>No guides matched your search.</p>}

            {pagePosts.length > 0 && (
              <div className={styles.articleGrid}>
                {pagePosts.slice(0, 3).map((post) => <ArticleCard post={post} key={post.slug} />)}

                {/*
                  AD SLOT: Blog in-feed responsive placement
                  Keep this exact position between article rows for the future ad component.
                  Ads are intentionally disabled for now.
                */}

                {pagePosts.slice(3).map((post) => <ArticleCard post={post} key={post.slug} />)}
              </div>
            )}

            {remainingPosts.length > postsPerPage && (
              <nav className={styles.pagination} aria-label="Blog pagination">
                {currentPage > 1 ? <Link href={`/blog?page=${currentPage - 1}`}>Previous</Link> : <span>Previous</span>}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => page === currentPage ? <strong aria-current="page" key={page}>{page}</strong> : <Link href={`/blog?page=${page}`} key={page}>{page}</Link>)}
                {currentPage < totalPages ? <Link href={`/blog?page=${currentPage + 1}`}>Next</Link> : <span>Next</span>}
              </nav>
            )}
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.popularCard}>
              <h2>Popular guides</h2>
              {popularPosts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}>{post.title}</Link>)}
            </section>

            {/*
              AD SLOT: Blog 300x600 sidebar placement
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
