import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteFooter from "@/components/website/site-footer";
import SiteHeader from "@/components/website/site-header";
import { getPublishedPost, getPublishedPosts, type BlogImage } from "@/content/blog-posts";
import styles from "../how-to-create-a-strong-password/article.module.css";

export const instant = false;

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) return { title: "Page not found | SecureVault", robots: { index: false, follow: false } };
  return {
    title: post.seoTitle,
    description: post.summary,
    openGraph: post.featuredImage ? { title: post.seoTitle, description: post.summary, images: [post.featuredImage.src] } : undefined,
  };
}

function ResponsiveImage({ image, placeholder, priority = false }: { image?: BlogImage; placeholder: string; priority?: boolean }) {
  return image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 720px" priority={priority} /> : <span>{placeholder}</span>;
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) redirect("/404");

  const popularPosts = getPublishedPosts().filter((item) => item.slug !== post.slug).slice(0, 3);
  const toc = [...post.sections.map(({ title, id }) => ({ title, id })), { title: "Frequently asked questions", id: "frequently-asked-questions" }];

  return (
    <div className={styles.site}>
      <SiteHeader active="/blog" />
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{post.title}</span>
      </nav>

      <main className={styles.container}>
        <header className={styles.articleHero}>
          <div className={styles.heroContent}>
            <span className={styles.tag}>{post.category}</span>
            <h1>{post.title}</h1>
            <p className={styles.lead}>{post.excerpt}</p>
            <p className={styles.meta}>Updated {post.updated} <span>By {post.author.name}</span> <span>{post.readTime}</span></p>
          </div>
          {post.featuredImage && (
            <div className={styles.heroImage}>
              <ResponsiveImage image={post.featuredImage} placeholder="" priority />
            </div>
          )}
        </header>

        <div className={styles.pageGrid}>
          <article className={styles.article}>
            <nav className={`${styles.toc} ${styles.mobileToc}`} aria-label="In this guide">
              <strong>In this guide</strong>
              {toc.map(({ title, id }) => <a href={`#${id}`} key={id}>{title}</a>)}
            </nav>

            {post.sections.map((section, sectionIndex) => (
              <section className={styles.copySection} id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.steps?.map((step) => <div className={styles.step} key={step.title}><h3>{step.title}</h3><p>{step.body}</p></div>)}
                {section.examples && (
                  <div className={styles.exampleGrid}>
                    {section.examples.map((example) => (
                      <article key={example.label}>
                        <span className={example.label === "Weak" ? styles.weak : styles.strong}>{example.label}</span>
                        <strong>{example.password}</strong><p>{example.body}</p>
                      </article>
                    ))}
                  </div>
                )}
                {section.vaultCta && <div className={styles.vaultCard}><h3>{section.vaultCta.title}</h3><p>{section.vaultCta.body}</p><Link href="/app">Open Vault</Link></div>}

                {sectionIndex === 1 && (
                  /*
                    AD SLOT: Blog article 336x280 in-article placement
                    Keep this exact position after the password steps for the future ad component.
                    Ads are intentionally disabled for now.
                  */ null
                )}
              </section>
            ))}

            <section className={styles.faqSection} id="frequently-asked-questions">
              <h2>Frequently asked questions</h2>
              <div className={styles.faqList}>
                {post.faqs.map(({ question, answer }) => (
                  <details className={styles.faq} name="article-faq" key={question}>
                    <summary><span>{question}</span><span className={styles.faqIcon} aria-hidden="true" /></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <aside className={styles.authorCard}>
              <div className={`${styles.photo} ${post.author.photo ? styles.photoImage : ""}`}>
                <ResponsiveImage image={post.author.photo} placeholder="[Photo]" />
              </div>
              <div><strong>{post.author.name}</strong><p>{post.author.bio}</p></div>
            </aside>
          </article>

          <aside className={styles.sidebar}>
            <section className={styles.popularCard}>
              <h2>Popular guides</h2>
              {popularPosts.length ? popularPosts.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}>{item.title}</Link>) : <Link href="/blog">Browse all guides</Link>}
            </section>

            <nav className={`${styles.toc} ${styles.desktopToc}`} aria-label="In this guide">
              <strong>In this guide</strong>
              {toc.map(({ title, id }) => <a href={`#${id}`} key={id}>{title}</a>)}
            </nav>

            {/*
              AD SLOT: Blog article 300x600 sidebar placement
              Keep this exact position below Popular guides for the future ad component.
              Ads are intentionally disabled for now.
            */}
          </aside>
        </div>

        <section className={styles.related}>
          <h2>Related articles</h2>
          <div>{post.related.map((item) => item.slug ? <Link className={styles.relatedLink} href={`/blog/${item.slug}`} key={item.title}><h3>{item.title}</h3><p>{item.summary}</p></Link> : <article key={item.title}><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div>
        </section>

        <section className={styles.cta}><h2>Save passwords securely</h2><p>Store your passwords in an encrypted vault on your device.</p><Link href="/app">Open Vault</Link></section>
      </main>
      <SiteFooter />
    </div>
  );
}
