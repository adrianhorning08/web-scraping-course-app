import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Megaphone,
  X,
  CreditCard,
  Loader2,
  Search,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { createCheckoutSession } from "../api/stripe";

const BASE_PRICE = 247; // Define base price as a constant

const getPPPDiscount = (countryCode) => {
  // PPP-based discount tiers (percentages)
  const discountTiers = {
    // Tier 1 - No discount (High income countries)
    US: 0,
    GB: 0,
    CA: 0,
    AU: 0,
    NZ: 0,
    SG: 0,
    JP: 0,
    DE: 0,
    FR: 0,
    NL: 0,
    SE: 0,
    DK: 0,
    NO: 0,
    CH: 0,

    // Tier 2 - 40% discount (Upper middle income)
    CN: 40,
    BR: 40,
    MX: 40,
    TR: 40,
    MY: 40,
    TH: 40,
    RU: 40,
    AR: 40,
    CL: 40,
    CO: 40,

    // Tier 3 - 60% discount (Lower middle income)
    IN: 60,
    ID: 60,
    PH: 60,
    EG: 60,
    VN: 60,
    MA: 60,
    PK: 60,
    BD: 60,
    NG: 60,
    KE: 60,
  };

  return discountTiers[countryCode?.toUpperCase()] || 0;
};

function UserAvatar({ user }) {
  // If user has a Google profile photo, use it
  if (user?.photoURL) {
    // Add proxy URL to handle CORS
    const proxyPhotoURL = user.photoURL.replace("s96-c", "s400-c");
    return (
      <img
        src={proxyPhotoURL}
        alt={user.displayName || user.email}
        className="w-8 h-8 rounded-full"
        referrerPolicy="no-referrer"
      />
    );
  }

  // Otherwise use DiceBear avatar
  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    user?.email || "default"
  }`;
  return (
    <img
      src={dicebearUrl}
      alt={user?.displayName || user?.email}
      className="w-8 h-8 rounded-full bg-dark-700"
    />
  );
}

// const ANNOUNCEMENTS = [
const ANNOUNCEMENTS = [];
//   {
//     id: 1,
//     date: "2024-02-15",
//     title: "New Module Released!",
//     content:
//       "Advanced LinkedIn Scraping techniques module is now available. Check it out in the Advanced Topics section!",
//   },
//   {
//     id: 2,
//     date: "2024-02-10",
//     title: "Live Q&A Session",
//     content:
//       "Join us this Friday at 2 PM EST for a live Q&A session about web scraping best practices.",
//   },
// ];

// TODO: and need to keep track if the user has paid
// TODO: implement search
// TODO: and if users have already paid, automatically say they're good

export default function Course() {
  const [user] = useAuthState(auth);
  const [courseModules, setCourseModules] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState([0]);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState(
    new Set()
  );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [finalPrice, setFinalPrice] = useState(BASE_PRICE);

  const toggleModule = (index) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLessonClick = (lesson, module) => {
    if (module.locked || lesson.locked) {
      setShowUpgradeModal(true);
      return;
    }
    setCurrentLesson(lesson);
  };

  const handleSearchKeyDown = (e) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Prevent cursor from moving
        setSelectedResultIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault(); // Prevent cursor from moving
        setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedResultIndex >= 0) {
          const result = searchResults[selectedResultIndex];
          handleSearchResultClick(result, result.module);
        }
        break;
      case "Escape":
        setSearchQuery("");
        setSelectedResultIndex(-1);
        break;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedResultIndex(-1); // Reset selection when search changes
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = courseModules
      .flatMap((module) =>
        module.lessons.map((lesson) => ({
          ...lesson,
          module,
          matches: [
            ...(lesson.title.toLowerCase().includes(query.toLowerCase())
              ? ["title"]
              : []),
            ...(lesson.content?.toLowerCase().includes(query.toLowerCase())
              ? ["content"]
              : []),
          ],
        }))
      )
      .filter((lesson) => lesson.matches.length > 0);

    setSearchResults(results);
  };

  const handleSearchResultClick = (lesson, module) => {
    if (module.locked || lesson.locked) {
      setShowUpgradeModal(true);
      return;
    }
    setCurrentLesson(lesson);
    // Expand the module containing this lesson
    const moduleIndex = courseModules.findIndex((m) => m.id === module.id);
    if (!expandedModules.includes(moduleIndex)) {
      setExpandedModules((prev) => [...prev, moduleIndex]);
    }
    setSearchQuery(""); // Clear search after selection
  };

  const findNextLesson = (currentLessonId) => {
    for (
      let moduleIndex = 0;
      moduleIndex < courseModules.length;
      moduleIndex++
    ) {
      const module = courseModules[moduleIndex];
      const lessonIndex = module.lessons.findIndex(
        (l) => l.id === currentLessonId
      );

      if (lessonIndex !== -1) {
        // If there's a next lesson in this module
        if (lessonIndex < module.lessons.length - 1) {
          return module.lessons[lessonIndex + 1];
        }
        // If there's a next module with lessons
        if (moduleIndex < courseModules.length - 1) {
          const nextModule = courseModules[moduleIndex + 1];
          if (nextModule.lessons.length > 0 && !nextModule.locked) {
            return nextModule.lessons[0];
          }
        }
      }
    }
    return null;
  };

  const handleCompleteLesson = async () => {
    if (!currentLesson || !user || isCompletingLesson) return;

    setIsCompletingLesson(true);
    try {
      const response = await fetch(
        "https://long-running-server.onrender.com/api/lesson-completed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId: currentLesson.id,
            userId: user.uid,
            apiToken: user?.uid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark lesson as completed");
      }

      // Update local state to mark lesson as completed
      setCourseModules((modules) =>
        modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === currentLesson.id
              ? { ...lesson, is_completed: true }
              : lesson
          ),
        }))
      );
      console.log("fuck me");

      // Find and navigate to next lesson
      const nextLesson = findNextLesson(currentLesson.id);
      if (nextLesson && !nextLesson.locked) {
        setCurrentLesson(nextLesson);
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    } finally {
      setIsCompletingLesson(false);
    }
  };

  useEffect(() => {
    const fetchCourseModules = async () => {
      console.log("Fetch attempt - User:", user); // Check if this runs and if user exists

      try {
        const response = await fetch(
          // `https://long-running-server.onrender.com/api/get-web-scraping-course-lessons?userId=${
          `http://localhost:3000/api/get-web-scraping-course-lessons?userId=${
            user?.uid || ""
          }`
        );
        const data = await response.json();

        setCourseModules(data);

        if (!currentLesson && data[0]?.lessons[0]) {
          setCurrentLesson(data[0].lessons[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch course modules:", error);
        setIsLoading(false);
      }
    };

    fetchCourseModules();
  }, [user]);

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserCountry(data.country);

        // Calculate discounted price
        const discount = getPPPDiscount(data.country);
        const discountedPrice = BASE_PRICE * (1 - discount / 100);
        setFinalPrice(Math.round(discountedPrice));
      } catch (error) {
        console.error("Failed to fetch user country:", error);
        setFinalPrice(BASE_PRICE); // Fallback to base price
      }
    };

    fetchUserCountry();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <nav className="border-b border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <h1 className="text-xl font-bold">
                    The Ultimate Web Scraping Course
                  </h1>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-gray-400">
                      {user.displayName || user.email}
                    </span>
                    <UserAvatar user={user} />
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              <p className="text-gray-400">Loading course content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-xl font-bold">
                  The Ultimate Web Scraping Course
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex items-center bg-dark-800 rounded-lg px-3 py-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="bg-transparent border-none focus:outline-none text-gray-300 pl-2 w-64"
                  />
                </div>

                {searchResults.length > 0 && searchQuery && (
                  <div className="absolute top-full mt-2 w-full bg-dark-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <button
                          key={result.id}
                          onClick={() =>
                            handleSearchResultClick(result, result.module)
                          }
                          className={`w-full px-4 py-3 text-left hover:bg-dark-700 flex flex-col gap-1 ${
                            index === selectedResultIndex ? "bg-dark-700" : ""
                          }`}
                          onMouseEnter={() => setSelectedResultIndex(index)}
                        >
                          <div className="font-medium text-primary-200">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            in {result.module.title}
                          </div>
                          {result.matches.includes("content") && (
                            <div className="text-xs text-gray-500 truncate">
                              {result.content}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {user ? (
                <>
                  <span className="text-gray-400">
                    {user.displayName || user.email}
                  </span>
                  <UserAvatar user={user} />
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Announcements Section */}
        {ANNOUNCEMENTS.some((a) => !dismissedAnnouncements.has(a.id)) && (
          <div className="mb-8 space-y-4">
            {ANNOUNCEMENTS.map(
              (announcement) =>
                !dismissedAnnouncements.has(announcement.id) && (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary-600/10 border border-primary-600/20 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Megaphone className="w-5 h-5 text-primary-400 mt-1" />
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-primary-400">
                              {announcement.title}
                            </h3>
                            <span className="text-sm text-gray-400">
                              {announcement.date}
                            </span>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {announcement.content}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setDismissedAnnouncements(
                            (prev) => new Set([...prev, announcement.id])
                          )
                        }
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-dark-800 rounded-xl overflow-hidden">
              {currentLesson?.loom_url ? (
                <iframe
                  src={currentLesson.loom_url.replace("share/", "embed/")}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No video
                </div>
              )}
            </div>

            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                {currentLesson?.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400">{currentLesson?.content}</p>
              </div>

              {/* Add completion button */}
              {currentLesson && !currentLesson.is_completed && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleCompleteLesson}
                    disabled={isCompletingLesson}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCompletingLesson ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        Complete & Continue
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Add support message */}
            <div className="bg-dark-800 rounded-xl p-6">
              <p className="text-gray-300 text-sm">
                Have questions? Feel free to ask in our{" "}
                <a
                  href="https://discord.gg/qd96DwhwwX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300"
                >
                  Discord community
                </a>{" "}
                or email me directly at adrian@thewebscrapingguy.com
              </p>
            </div>
          </div>

          {/* Course Outline Column */}
          <div className="bg-dark-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Course Content</h3>
            <div className="space-y-4">
              {courseModules.map((module, moduleIndex) => (
                <motion.div
                  key={moduleIndex}
                  initial={false}
                  animate={{
                    backgroundColor: expandedModules.includes(moduleIndex)
                      ? "#2A2A2A"
                      : "#1A1A1A",
                  }}
                  className="rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full px-4 py-3 flex flex-col gap-2 text-left hover:bg-dark-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {module.locked ? (
                          <Lock className="w-5 h-5 text-gray-500" />
                        ) : module.lessons.every(
                            (lesson) => lesson.is_completed
                          ) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                        )}
                        <span className="font-medium text-lg text-primary-200 hover:text-primary-100 transition-colors">
                          {module.title}
                        </span>
                      </div>
                      {expandedModules.includes(moduleIndex) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                    <div className="pl-8">
                      <span className="text-xs text-gray-400">
                        {module.lessons.filter((l) => l.is_completed).length} of{" "}
                        {module.lessons.length} lessons completed
                      </span>
                    </div>
                  </button>

                  {expandedModules.includes(moduleIndex) && (
                    <div className="px-4 pb-3">
                      <div className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson, module)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                              currentLesson?.id === lesson.id
                                ? "bg-primary-600"
                                : "hover:bg-dark-700"
                            }`}
                          >
                            {lesson.is_completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="w-5 h-5 text-gray-500" />
                            ) : (
                              <Play className="w-5 h-5 text-gray-400" />
                            )}
                            <div className="flex-1 text-left">
                              <div className="text-sm">{lesson.title}</div>
                              <div className="text-xs text-gray-400">
                                {lesson.duration}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Upgrade to Watch</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold">One-time Payment</h4>
                  <p className="text-gray-400">
                    Get lifetime access to all content
                  </p>
                </div>
                <div className="ml-auto">
                  {userCountry && getPPPDiscount(userCountry) > 0 ? (
                    <div className="text-right">
                      <span className="text-2xl font-bold">${finalPrice}</span>
                      <div className="text-sm text-gray-400 line-through">
                        ${BASE_PRICE}
                      </div>
                      <div className="text-sm text-green-500">
                        {getPPPDiscount(userCountry)}% off in {userCountry}
                      </div>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold">${BASE_PRICE}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Access all course modules
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Download source code
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Future updates included
                </li>
              </ul>

              <div className="space-y-4">
                {!user ? (
                  <Link
                    to="/login"
                    className="block w-full py-3 px-4 text-center font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Create Account to Purchase
                  </Link>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        setIsUpgrading(true);
                        const checkoutUrl = await createCheckoutSession(
                          user.email,
                          user.uid
                        );
                        window.location.href = checkoutUrl;
                      } catch (error) {
                        console.error(
                          "Failed to create checkout session:",
                          error
                        );
                      } finally {
                        setIsUpgrading(false);
                      }
                    }}
                    className="w-full py-3 px-4 font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {isUpgrading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Preparing Checkout...
                      </span>
                    ) : (
                      "Buy Now!"
                    )}
                  </button>
                )}
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  disabled={isUpgrading}
                  className="w-full py-3 px-4 font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Continue with Free Content
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
