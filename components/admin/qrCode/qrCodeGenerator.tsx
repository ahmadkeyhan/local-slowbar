"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/toastContext";

export default function QRCodeGenerator() {
  const [baseUrl, setBaseUrl] = useState("")
  // const [previewSize, setPreviewSize] = useState(200); // Fixed size for preview
  const previewSize = 200;
  const [downloadSize, setDownloadSize] = useState(200); // Size for downloads
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Set default URL to the current site
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin)
    }
  }, []);

  const handleDownloadPNG = () => {
    if (!qrRef.current) return;

    try {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return;

      // Create a new canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to match download size
      canvas.width = downloadSize;
      canvas.height = downloadSize;

      // Convert SVG to a data URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create a new image to draw on canvas
      const img = new Image();
      img.crossOrigin = "anonymous";

      // When image loads, draw it on canvas and create download
      img.onload = () => {
        // Draw the QR code, scaling to the download size
        ctx.drawImage(img, 0, 0, downloadSize, downloadSize);

        finalizePngDownload(canvas);
      };

      // Load the QR code image
      img.src = svgUrl;
    } catch (error) {
      console.error("Error downloading PNG:", error);
      toast({
        title: "دانلود انجام نشد!",
        description: "دانلود فایل png انجام نشد.",
        variant: "destructive",
      });
    }
  };

  // Add this helper function for PNG download
  const finalizePngDownload = (canvas: HTMLCanvasElement) => {
    try {
      const pngFile = canvas.toDataURL("image/png");

      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${baseUrl}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: "کیوآر کد دانلود شد!",
        description: "دانلود فایل png انجام شد.",
      });
    } catch (error) {
      console.error("Error finalizing PNG download:", error);
      toast({
        title: "دانلود انجام نشد!",
        description: "ایجاد فایل png با مشکل مواجه شد.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadSVG = () => {
    if (!qrRef.current) return;

    try {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return;

      // Clone the SVG to avoid modifying the displayed one
      const clonedSvg = svg.cloneNode(true) as SVGElement;

      finalizeSvgDownload(clonedSvg);
    } catch (error) {
      console.error("Error downloading SVG:", error);
      toast({
        title: "دانلود انجام نشد!",
        description: "دانلود فایل svg انجام نشد.",
        variant: "destructive",
      });
    }
  };

  const finalizeSvgDownload = (svgElement: SVGElement) => {
    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = `qr-code-${baseUrl}.svg`;
      downloadLink.click();

      URL.revokeObjectURL(svgUrl);

      toast({
        title: "کیوآر کد دانلود شد!",
        description: "دانلود فایل svg انجام شد.",
      });
    } catch (error) {
      console.error("Error finalizing SVG download:", error);
      toast({
        title: "دانلود انجام نشد!",
        description: "ایجاد فایل svg با مشکل مواجه شد.",
        variant: "destructive",
      });
    }
  };

  return (
    <div dir="rtl" className="grid gap-6 md:grid-cols-2">
      <Card className="bg-blue">
        <CardContent className="pt-6">
            <div dir="rtl" className="grid gap-8 grid-cols-2">
                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="url" className="font-bold">آدرس کیوآر</Label>
                  <p>{baseUrl}</p>
                </div>
                <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                  <Label className="font-bold">{`ابعاد دانلود: ${downloadSize} پیکسل`}</Label>
                  <Slider
                    dir="rtl"
                    value={[downloadSize]}
                    min={100}
                    max={2400}
                    step={50}
                    onValueChange={(value) => setDownloadSize(value[0])}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fgColor">رنگ پیش‌زمینه</Label>
                  <Input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bgColor">رنگ پس‌زمینه</Label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full"
                  />
                </div>
            </div>
        </CardContent>
      </Card>

      <Card className="bg-indigo">
        <CardContent className="pt-6 flex flex-col items-center">
          <div
            ref={qrRef}
            className="mb-6 rounded-lg flex items-center justify-center"
            style={{
              width: `${previewSize + 16}px`,
              height: `${previewSize + 16}px`,
            }}
          >
            <QRCodeSVG
              value={baseUrl}
              size={previewSize}
              bgColor={bgColor}
              fgColor={fgColor}
              level="H"
              marginSize={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button onClick={handleDownloadPNG}>
              <LuDownload className="w-4 h-4" />
              <p dir="rtl">دانلود PNG</p>
            </Button>
            <Button onClick={handleDownloadSVG}>
              <LuDownload className="w-4 h-4" />
              <p dir="rtl">دانلود SVG</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
