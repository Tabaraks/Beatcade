import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";

import Canvas from "./pages/canvas";
import Customizer from "./pages/Customizer";

import ContactForm from "./pages/ContactForm";
import state, { PAGES } from "./store";
import Loader from "./pages/Loader";
import Home from "./pages/home";
import { JoinUs } from "./pages/home/JoinUs";

function Main() {
  const snap = useSnapshot(state);

  // const [assets, setAssets] = useState({ audio: null, model: null, environment: null });
  const [assets, setAssets] = useState(null);

  return (
    <main className="app transition-all ease-in bg-[#0f0010]">
      {snap.page === PAGES.loading && (
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source
            src={
              "https://s3-figma-videos-production-sig.figma.com/video/1313586892493429695/TEAM/2ce2/5b22/-6262-4065-8170-02f337b1948b?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=feIBEvc3lF56IF4TYHVPRLcrLeUerA7uOl7WFACni1GwLKAPr6mqvsg5LqrAcr4k59FNAyWMDjJh8g0LYz~DlaCU-93fOLSblAru~ls6qI148-dMUV6SvRXeNLVPSCl0WHtJgalh0vCqmmdacEEFIH7i8oY6ifxOcOsE46s1DtN-TSVb9C7wJ3ggoJddlaYbcqySpYvUEqSJ-tHZytSK5jvfIG0sERNotOCj6WP6IhkKhE2seiAhOcp2F3muavXGTeJSMNB446Jr898Zs7iDFSUKJ7Nq-5RMHV4pu2bWCCt~TsK5lvbV6stx45r5ixe3xoUvkpoO7onk14rWUpH5hQ__"
            }
            type="video/mp4"
          />
        </video>
      )}

      {/* {snap.model &&
        <video className='absolute w-full h-full object-cover' autoPlay loop muted>
          <source src={"https://s3-figma-videos-production-sig.figma.com/video/1313586892493429695/TEAM/ecab/fe4a/-7343-46d9-b622-980d35e6ec7e?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S3GFm-4BT3Z~2uCWRFUuLNLCXUvoCmfyfdHJ147SzSvUkbpxCG3TvK3Xv3WqYOuPEZ3SrCGvwVwwwLzj-hEd1fnNPAwpx9FM7mH~-JMn~w62zfZqIrBBVab3ahTydyxQ4KFNerNGFFkHWCXzWMaeMAMG3tivZQ4QAkMUeDqeotmobYtUhnhdmpE1Higb-VYI2T6alS8XJ34Guhwc8UR7YIy-pqXe8UXHi7leHPtMTQFnH1q7f17KVV-iX18LHuiDTN9A3njnb5EZnMfpoVxgbYCpQRhbgfJK9jlbizZbyKbub38ekVnb9dAP-DOmqK4u4PZAt3UMKrIVIKTVYgmm2g__"} type='video/mp4' />
        </video>
      } */}

      {snap.page === PAGES.loading && (
        <Loader assets={assets} setAssets={setAssets} />
      )}

      {snap.page === PAGES.intro && <Home />}
      {snap.page === PAGES.joinus && <JoinUs />}

      {snap.page !== PAGES.loading && <Canvas assets={assets} />}

      {snap.page === PAGES.customize && <Customizer />}
    </main>
  );
}

export default Main;
