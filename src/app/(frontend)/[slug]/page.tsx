import { fetchPageBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Shield, Zap, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }
  return {
    title: `${page.title} | Visual Kitha CMS`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await fetchPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  // Specific template for "About Us" page
  if (page.slug === 'about-us') {
    return (
      <>
        <section className="w-full py-20 md:py-28 bg-secondary border-b">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {page.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Learn more about our mission, our team, and our commitment to excellence.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                 <div className="prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }} />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="About Us Image"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="team office"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                Our Values
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                The Principles That Guide Us
              </h2>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1 text-center">
                <Zap className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We constantly push the boundaries of technology to deliver cutting-edge solutions.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <User className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold">Customer-Centric</h3>
                <p className="text-sm text-muted-foreground">
                  Our customers are at the heart of everything we do. Your success is our success.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Shield className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  We operate with transparency and honesty, building trust with our clients and partners.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Specific template for "Contact Us" page
  if (page.slug === 'contact-us') {
    return (
      <>
        <section className="w-full py-20 md:py-28 bg-secondary border-b">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {page.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Any question or remarks? Just write us a message!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Question about a product" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="flex flex-col justify-center space-y-8">
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4">Contact Information</h3>
                  <p className="text-muted-foreground mb-6">
                    Our team is available to help answer your questions.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-full flex-shrink-0 w-12 h-12 items-center justify-center flex">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">contact@visualkitha.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-full flex-shrink-0 w-12 h-12 items-center justify-center flex">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-full flex-shrink-0 w-12 h-12 items-center justify-center flex">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Office Address</h4>
                      <p className="text-muted-foreground">123 Videotron Ave, Montreal, QC, Canada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Generic page renderer for other pages
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">{page.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }} />
        </CardContent>
      </Card>
    </div>
  );
}
