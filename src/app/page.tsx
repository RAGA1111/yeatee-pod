import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary/5 pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />

        <div className="container px-6 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 transition-colors hover:bg-primary/10 cursor-default">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span className="tracking-wide">Summer Collection 2026 is Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
            Wear Your Vibe. <br />
            <span className="text-primary">Create Your Brand.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The minimal print-on-demand platform where you can shop unique designs or launch your own brand in seconds. No inventory, just creativity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="h-12 px-8 rounded-full text-lg w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Shop Finds <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/design/upload">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg w-full sm:w-auto border-2 hover:bg-secondary/10">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-20 container px-6 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Drops</h2>
            <p className="text-muted-foreground">Handpicked designs fresh from our creators.</p>
          </div>
          <Link href="/shop">
            <Button variant="ghost" className="hidden sm:flex group">
              View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link href="/shop">
            <Button variant="outline" className="w-full rounded-full">
              View all products
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Prop / Dual Role */}
      <section className="py-24 bg-secondary/5 border-y border-border/50">
        <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* For Shoppers */}
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-secondary/20 shadow-sm hover:shadow-md transition-all">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary font-bold">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Shop Unique</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Discover thousands of unique, artist-designed pieces you won't find anywhere else. Transparent pricing shows you exactly what goes to the creator.
                </p>
                <ul className="space-y-3 mb-8 text-sm font-medium text-foreground/80">
                  <li className="flex items-center">✓ Premium quality materials</li>
                  <li className="flex items-center">✓ Ethical production</li>
                  <li className="flex items-center">✓ Direct-to-creator support</li>
                </ul>
                <Link href="/shop">
                  <Button variant="link" className="px-0 text-secondary hover:text-secondary/80">
                    Start Browsing &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* For Creators */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-sm hover:shadow-md transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary font-bold">
                  <Palette className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Create & Earn</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Turn your art into profit with our zero-risk platform. We handle printing, shipping, and customer service while you focus on creating.
                </p>
                <ul className="space-y-3 mb-8 text-sm font-medium text-foreground/80">
                  <li className="flex items-center">✓ No upfront costs</li>
                  <li className="flex items-center">✓ Automated profit optimization</li>
                  <li className="flex items-center">✓ Global fulfillment network</li>
                </ul>
                <Link href="/design/upload">
                  <Button variant="link" className="px-0 text-primary hover:text-primary/80">
                    Open Your Shop &rarr;
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
