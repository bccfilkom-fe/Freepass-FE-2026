import MainButton from "@/components/button/MainButton";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useServices } from "@/hooks/useService";
import { useTransitionRouterWithProgress } from "@/hooks/useTransitionRouterWithProgress";
import { Service } from "@/types/type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import Image from "next/image";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Services = () => {
  const { services, isPending, error } = useServices();

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "top 20%",
        scrub: true
      },
    });

    timeline
      .from(".service-title", {
        duration: 2,
        stagger: 0.5,
        y: 100,
        ease: "sine.inOut",
      })
      .from(
        ".bg-service-title",
        {
          duration: 2,
          scale: 0.9,
          ease: "sine.inOut",
        },
        "<"
      );
  }, [])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const splitReady = SplitText.create(".ready", {
      type: "lines",
    });

    gsap.from(splitReady.lines, {
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
      duration: 2,
      y: 100,
      autoAlpha: 0,
    });

    ScrollTrigger.refresh();
  }, [services?.length]);

  return (
    <section
      id="services"
      className="relative z-4 w-full h-fit rounded-t-[clamp(1rem,2vw,2vw)] p-[.5vw] bg-secondary-foreground overflow-hidden"
    >
      <header className="w-full rounded-[clamp(1rem,2vw,2vw)] flex justify-center bg-secondary bg-service-title overflow-hidden mb-10 md:mb-20">
        <div className="w-full max-w-fit flex flex-col justify-center items-center text-secondary-foreground">
          <p className="text-xl text-secondary-foreground">Toeankoe</p>
          <h1 className="service-title text-[9vw] leading-[10vw] uppercase font-michroma">Our Services</h1>
        </div>
      </header>

      <main className="p-[2vw] flex flex-col items-center gap-3">
        <p className="text-secondary text-2xl sm:text-4xl font-bold mb-3 uppercase self-start ready overflow-hidden">
          Ready to Book?
        </p>

        <div className="w-full h-full grid grid-cols-2 lg:gap-3 gap-1 overflow-visible">
          {isPending && (
            [...Array(4)].map((_,index) => (
              <ServiceSkeleton key={index}/>
            ))
          )}

          {services && (
            services.map(service => (
              <ServiceCard key={service._id} service={service}/>
            ))
          )}

          {!isPending && !services && error && (
            <p></p>
          )}
        </div>
      </main>
    </section>
  );
};

export default Services



const ServiceCard = ({service} : {service: Service}) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useTransitionRouterWithProgress()

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div onClick={() => setIsOpen(true)} className="w-full rounded-md flex flex-col bg-primary cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
          <div className="w-full relative aspect-square lg:aspect-5/2 rounded-md overflow-hidden">
            <Image
              src={service.imageUrl}
              placeholder="blur"
              fill blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAT0lEQVQYV43OsQrAMAiE4YvoK2Tw/R9NHdydMrSkQ6CUlNz88XOtqi78rB0Dd0fvHSLy6q3CGAPMjIh40MRzC5gZVBVEhMz8gt3P85O7wg0bFi351/tz5gAAAABJRU5ErkJggg=="
              alt="service_barber"
              className="w-full h-full object-cover"
              />
          </div>

          <div className="flex flex-col items-start gap-1 p-4 lg:p-5">
            <h2 className="text-xl lg:text-3xl font-bold text-secondary-foreground">{service.name}</h2>
            <h3>Price Rp.{service.price}, 00</h3>
          </div>
        </div>

        <DialogContent className="px-5">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>

          <h1 className="text-2xl font-bold">{service.name}</h1>
          <div className="w-full aspect-video rounded-md overflow-hidden relative">
            <Image
              src={service.imageUrl}
              fill
              className="object-center object-cover h-full w-full"
              alt="service_photo"
              loading="lazy"
            />
          </div>
          <div className="w-full grid grid-cols-[1fr_0.5fr] divide-x divide-x-black gap-4">
            <p className="pr-4">{service.description}</p>
            <div className="w-full flex flex-col gap-3">
              <p className="font-bold">
                Estimate Duration
                <br />
                <span className="font-normal">{service.durationMinute} min</span>
              </p>
              <p className="font-bold">IDR {service.price}</p>
            </div>
          </div>

          <DialogFooter className="flex flex-col py-3">
            <DialogClose asChild>
              <MainButton className="w-full" variant="outline">Cancel</MainButton>
            </DialogClose>
            <MainButton className="w-full" onClick={() => router.push("/book")}>Book Now</MainButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const ServiceSkeleton = () => {
  return (
    <div className="w-full rounded-md flex flex-col border bg-primary cursor-pointer">
      <Skeleton className="w-full aspect-square lg:aspect-5/2" />
    
      <div className="flex flex-col items-start gap-1 p-2 lg:p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}