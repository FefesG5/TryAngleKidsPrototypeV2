import { Inter, Poppins, Roboto, Cabin } from "next/font/google"; // Imported 3 common Google fonts - Delete those not required

export const inter = Inter({ subsets: ["latin"] });

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "700"],
});
