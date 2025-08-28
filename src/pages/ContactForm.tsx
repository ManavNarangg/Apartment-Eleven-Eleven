import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ContactForm() {
  const [formData, setFormData] = useState({
    idea: "",
    materialFile: null,
    additionalLinks: "",
    sector: "",
    linkedinProfile: "",
    fullName: "",
    email: "",
  });

  // dynamic top spacing to avoid header overlap
  const [topOffset, setTopOffset] = useState(28); // fallback padding if header not found

  useEffect(() => {
    // tries to measure page header height (works if your header is a <header> element)
    const headerEl = document.querySelector("header");
    if (headerEl) {
      const h = headerEl.getBoundingClientRect().height;
      setTopOffset(Math.ceil(h + 18)); // add a little breathing room
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description:
        "Thank you for your submission. We'll review it and get back to you soon.",
    });
    setFormData({
      idea: "",
      materialFile: null,
      additionalLinks: "",
      sector: "",
      linkedinProfile: "",
      fullName: "",
      email: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, materialFile: file }));
    } else if (file) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="min-h-screen bg-[#fdfaf6]"
      style={{
        // dynamic padding top to prevent header overlap (adjusts if header exists)
        paddingTop: topOffset,
        // optional symbolic background image - uncomment and set your image path:
        // backgroundImage: "url('/images/architectural-grid.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Submit Your Application
            </h1>
            <p className="text-black text-lg">
              Tell us about your idea and let's explore the possibilities
              together.
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="idea"
                        className="text-black font-medium mb-2 block"
                      >
                        Describe Your Idea*
                      </Label>
                      <Textarea
                        id="idea"
                        placeholder="Write a brief about your idea"
                        value={formData.idea}
                        onChange={(e) =>
                          handleInputChange("idea", e.target.value)
                        }
                        required
                        rows={6}
                        className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="additionalLinks"
                        className="text-black font-medium mb-2 block"
                      >
                        Additional Links to Your Ideas*
                      </Label>
                      <Textarea
                        id="additionalLinks"
                        placeholder="Include any other relevant material for our evaluation"
                        value={formData.additionalLinks}
                        onChange={(e) =>
                          handleInputChange("additionalLinks", e.target.value)
                        }
                        rows={4}
                        className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="sector"
                        className="text-black font-medium mb-2 block"
                      >
                        Sector of Interest*
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("sector", value)
                        }
                      >
                        <SelectTrigger className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400">
                          <SelectValue placeholder="Select your sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="sustainability">
                            Sustainability
                          </SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="material"
                        className="text-black font-medium mb-2 block"
                      >
                        Upload Relevant Material*
                      </Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-white hover:bg-slate-50 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <p className="text-slate-700 mb-2">
                          Drag and drop or upload Pitch Deck
                        </p>
                        <p className="text-sm text-slate-500 mb-4">
                          (PDF Files only)
                        </p>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <Label
                          htmlFor="file-upload"
                          className="cursor-pointer bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md text-slate-700 transition-colors inline-block"
                        >
                          Choose file
                        </Label>
                        {formData.materialFile && (
                          <p className="mt-2 text-sm text-black">
                            {formData.materialFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="linkedin"
                        className="text-black font-medium mb-2 block"
                      >
                        Your LinkedIn Profile*
                      </Label>
                      <Input
                        id="linkedin"
                        type="url"
                        placeholder="Enter your LinkedIn Profile URL"
                        value={formData.linkedinProfile}
                        onChange={(e) =>
                          handleInputChange("linkedinProfile", e.target.value)
                        }
                        required
                        className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="name"
                        className="text-black font-medium mb-2 block"
                      >
                        Your Name*
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your Full Name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        required
                        className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-black font-medium mb-2 block"
                      >
                        Your Email*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        className="bg-white border border-slate-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-12 py-4 bg-black text-white font-medium text-lg shadow-lg 
             hover:bg-neutral-800 hover:scale-105 hover:shadow-xl 
             transition-all duration-300"
                  >
                    Make a Wish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactForm;
