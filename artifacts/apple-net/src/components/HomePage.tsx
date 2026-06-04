"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Wifi, CreditCard, Building2, Smartphone, Megaphone, Download,
  Zap, MapPin, Phone, ChevronLeft, Globe, RefreshCw, Wallet, ArrowDown,
  Eye, TrendingUp, Star, Navigation, Clock
} from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, onValue, get } from "firebase/database";
import { NETWORKS as DEFAULT_NETWORKS, PROVINCES, getDistricts } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { NetworkDetailModal } from "@/components/NetworkDetailModal";
import type { Advertisement, SimCard, NetworkItem, CardItem } from "@/lib/types";
import type { User } from "firebase/auth";

interface HomePageProps {
  user: User | null;
  isAdmin: boolean;
  onAuthClick: () => void;
  onNavigate: (tab: string) => void;
}

// ─── HomeBanner type (controlled from admin) ──────────────
interface HomeBanner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: number;
}

export function HomePage({ user, isAdmin, onAuthClick, onNavigate }: HomePageProps) {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [homeBanners, setHomeBanners] = useState<HomeBanner[]>([]);
  const [simCards, setSimCards] = useState<SimCard[]>([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fbNetworks, setFbNetworks] = useState<NetworkItem[]>(DEFAULT_NETWORKS.map(n => ({
    ...n, ownerId: null, ownerName: null, ownerPhone: null, location: null,
    provinceId: null, provinceName: null, district: null, exactLocation: null,
    imageBase64: null, networkType: null, coverage: null, speed: null, createdAt: 0
  })));
  const [allCards, setAllCards] = useState<CardItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [maxBalance, setMaxBalance] = useState(0);
  const [appDownloadUrl, setAppDownloadUrl] = useState("");

  // Province / District filter state
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // User's province from Firebase
  const [userProvinceId, setUserProvinceId] = useState<string | null>(null);

  // Pull-to-refresh state
  const [refreshing, setRefreshing] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const touchStartY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Network detail modal
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkItem | null>(null);

  useEffect(() => {
    const unsubs: (() => void)[] = [];

    // Load advertisements (general ads)
    const adsUnsub = onValue(ref(db, "advertisements"), (snap) => {
      const data = snap.val();
      if (data) {
        setAds(Object.entries(data).map(([id, val]: [string, unknown]) => ({
          id, ...(val as Record<string, unknown>)
        })).filter((a: Record<string, unknown>) => a.isActive) as Advertisement[]);
      }
    });
    unsubs.push(adsUnsub);

    // Load home banners (admin-controlled banners for home page)
    const bannersUnsub = onValue(ref(db, "homeBanners"), (snap) => {
      const data = snap.val();
      if (data) {
        const banners = Object.entries(data)
          .map(([id, val]: [string, unknown]) => ({ id, ...(val as Record<string, unknown>) }))
          .filter((b: Record<string, unknown>) => b.isActive)
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => ((a.order as number) || 0) - ((b.order as number) || 0)) as HomeBanner[];
        setHomeBanners(banners);
      } else {
        setHomeBanners([]);
      }
    });
    unsubs.push(bannersUnsub);

    // Load SIM cards
    const simsUnsub = onValue(ref(db, "simCards"), (snap) => {
      const data = snap.val();
      if (data) {
        setSimCards(Object.entries(data).map(([id, val]: [string, unknown]) => ({
          id, ...(val as Record<string, unknown>)
        })).filter((s: Record<string, unknown>) => s.isAvailable) as SimCard[]);
      }
    });
    unsubs.push(simsUnsub);

    // Load networks
    const netUnsub = onValue(ref(db, "networks"), (snap) => {
      const data = snap.val();
      if (data) {
        setFbNetworks(Object.entries(data).map(([id, val]: [string, unknown]) => ({
          id, ...(val as Record<string, unknown>)
        })) as NetworkItem[]);
      }
    });
    unsubs.push(netUnsub);

    // Load all cards
    const cardsUnsub = onValue(ref(db, "cards"), (snap) => {
      const data = snap.val();
      setAllCards(data ? Object.entries(data).map(([id, val]: [string, unknown]) => ({
        id, ...(val as Record<string, unknown>)
      })) as CardItem[] : []);
    });
    unsubs.push(cardsUnsub);

    // Load user balance
    if (user) {
      const balUnsub = onValue(ref(db, `credit/${user.uid}/amount`), (snap) => {
        setBalance(snap.val() || 0);
      });
      unsubs.push(balUnsub);

      const maxBalUnsub = onValue(ref(db, "settings/maxBalance"), (snap) => {
        setMaxBalance(snap.val() || 0);
      });
      unsubs.push(maxBalUnsub);

      // Load app download URL from settings
      const dlUnsub = onValue(ref(db, "settings/appDownloadUrl"), (snap) => {
        const url = snap.val();
        if (url) setAppDownloadUrl(url);
      });
      unsubs.push(dlUnsub);

      // Load user's province
      get(ref(db, `users/${user.uid}/provinceId`)).then((snap) => {
        const provId = snap.val();
        if (provId) {
          setUserProvinceId(provId);
          setSelectedProvince(provId);
        }
      });
    }

    return () => unsubs.forEach(u => u());
  }, [user]);

  // Auto-scroll home banner every 4 seconds
  useEffect(() => {
    if (homeBanners.length <= 1) return;
    const timer = setInterval(() => setCurrentBanner((prev) => (prev + 1) % homeBanners.length), 4000);
    return () => clearInterval(timer);
  }, [homeBanners.length]);

  // Auto-scroll general ad banner every 5 seconds
  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = setInterval(() => setCurrentAd((prev) => (prev + 1) % ads.length), 5000);
    return () => clearInterval(timer);
  }, [ads.length]);

  // Get available card count for a network
  const getAvailableCount = (networkId: string) => {
    return allCards.filter(c => c.network === networkId && !c.isUsed).length;
  };

  // Filter networks that have available cards (vending machines)
  const vendingNetworks = fbNetworks.filter(net => {
    const available = getAvailableCount(net.id);
    if (available === 0) return false; // Only show networks with available cards
    if (selectedProvince && net.provinceId !== selectedProvince) return false;
    if (selectedDistrict && net.district !== selectedDistrict) return false;
    return true;
  }).sort((a, b) => {
    // Sort: user's province first, then by available count
    const aNear = a.provinceId === userProvinceId ? 1 : 0;
    const bNear = b.provinceId === userProvinceId ? 1 : 0;
    if (aNear !== bNear) return bNear - aNear;
    return getAvailableCount(b.id) - getAvailableCount(a.id);
  });

  // Split vending networks into nearby and all
  const nearbyVendingNetworks = userProvinceId
    ? vendingNetworks.filter(n => n.provinceId === userProvinceId)
    : [];
  const otherVendingNetworks = userProvinceId
    ? vendingNetworks.filter(n => n.provinceId !== userProvinceId)
    : vendingNetworks;

  // All networks with province/district filter
  const filteredNetworks = fbNetworks.filter(net => {
    if (selectedProvince && net.provinceId !== selectedProvince) return false;
    if (selectedDistrict && net.district !== selectedDistrict) return false;
    return true;
  });

  // Districts for selected province
  const districts = selectedProvince ? getDistricts(selectedProvince) : [];

  // Pull-to-refresh handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (el && el.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling) return;
    const el = scrollRef.current;
    if (el && el.scrollTop > 0) {
      setIsPulling(false);
      setPullY(0);
      return;
    }
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0) {
      setPullY(Math.min(diff * 0.4, 100));
    }
  }, [isPulling]);

  const handleTouchEnd = useCallback(() => {
    if (pullY >= 60 && !refreshing) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        setPullY(0);
        setIsPulling(false);
      }, 1200);
    } else {
      setPullY(0);
      setIsPulling(false);
    }
  }, [pullY, refreshing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="relative"
    >
      {/* Pull-to-refresh indicator */}
      <motion.div
        className="flex items-center justify-center py-2 overflow-hidden"
        animate={{ height: pullY > 0 || refreshing ? (refreshing ? 44 : pullY * 0.5) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          animate={{ rotate: refreshing ? 360 : 0 }}
          transition={{ repeat: refreshing ? Infinity : 0, duration: 0.8, ease: "linear" }}
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? "text-[#1B7A3D]" : "text-gray-300"}`} />
        </motion.div>
        {pullY > 30 && !refreshing && (
          <span className="text-[10px] text-gray-400 mr-2">
            <ArrowDown className="w-3 h-3 inline" /> اسحب للتحديث
          </span>
        )}
        {refreshing && <span className="text-[10px] text-[#1B7A3D] mr-2 font-bold">جاري التحديث...</span>}
      </motion.div>

      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="px-4 pt-4 pb-6"
      >

        {/* ══════════════════════════════════════════════════════════
            1. BALANCE CARD (Green Rectangle) — Shows user's balance
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative overflow-hidden rounded-3xl mb-4"
        >
          <div className="bg-gradient-to-bl from-[#1B7A3D] via-[#1f8e46] to-[#22A24D] rounded-3xl p-5 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/[0.02] rounded-full" />

            <div className="relative z-10">
              {/* Header: Logo + Greeting */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30 shadow-md">
                    <img src="/images/IMG_20260527_220851.jpg" alt="Apple.NET" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-base font-black text-white">
                      {user ? `مرحباً بك` : "مرحباً بك في AppleNet"}
                    </h1>
                    <p className="text-white/50 text-[10px]">
                      {user ? "رصيدك الحالي" : "سجل الدخول لمتابعة"}
                    </p>
                  </div>
                </div>
                {!user && (
                  <Button
                    onClick={onAuthClick}
                    className="bg-white/20 text-white border border-white/30 font-bold rounded-xl h-9 text-xs hover:bg-white/30 haptic-press px-4"
                  >
                    تسجيل الدخول
                  </Button>
                )}
              </div>

              {/* Balance Amount */}
              {user ? (
                <>
                  <motion.div
                    key={balance}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center mb-1"
                  >
                    <p className="text-4xl font-black text-white tracking-tight">{balance.toLocaleString()}</p>
                  </motion.div>
                  <p className="text-white/50 text-sm text-center mb-3">ريال يمني</p>

                  {/* Max balance progress */}
                  {maxBalance > 0 && (
                    <div className="mb-3">
                      <div className="bg-white/10 rounded-xl px-3 py-1.5">
                        <div className="flex items-center justify-between text-white/40 text-[10px]">
                          <span>السقف الأقصى</span>
                          <span>{maxBalance.toLocaleString()} ر.ي</span>
                        </div>
                        <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white/40 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min((balance / maxBalance) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onNavigate("cards")}
                      className="flex-1 bg-white text-[#1B7A3D] font-bold rounded-xl h-11 text-sm hover:bg-white/90 shadow-md haptic-press"
                    >
                      <ShoppingBag className="w-4 h-4 ml-1.5" />شراء كروت
                    </Button>
                    <Button
                      onClick={() => onNavigate("deposit")}
                      className="flex-1 bg-white/20 text-white border border-white/30 font-bold rounded-xl h-11 text-sm hover:bg-white/30 haptic-press"
                    >
                      <Wallet className="w-4 h-4 ml-1.5" />إيداع رصيد
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white/70 text-xs leading-relaxed text-center mb-4 max-w-xs mx-auto">
                    منصة شراء كروت الإنترنت الأولى في اليمن — اشترِ كروت الهوت سبوت بسهولة وأمان
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={onAuthClick}
                      className="flex-1 bg-white text-[#1B7A3D] font-bold rounded-xl h-11 text-sm hover:bg-white/90 shadow-md haptic-press"
                    >
                      تسجيل الدخول
                    </Button>
                    <Button
                      onClick={() => onNavigate("cards")}
                      className="flex-1 bg-white/20 text-white border border-white/30 font-bold rounded-xl h-11 text-sm hover:bg-white/30 haptic-press"
                    >
                      <Wifi className="w-4 h-4 ml-1.5" />تصفح الكروت
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            2. AD BANNER (Below Balance Card) — Admin-controlled banners
            ══════════════════════════════════════════════════════════ */}
        {homeBanners.length > 0 ? (
          <div className="mb-4">
            <div className="relative rounded-2xl overflow-hidden card-shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBanner}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[16/7] bg-white"
                >
                  <img
                    src={homeBanners[currentBanner]?.imageUrl || "/images/IMG-20260527-WA0043.jpg"}
                    alt={homeBanners[currentBanner]?.title || "إعلان"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-3">
                    <Badge className="bg-[#1B7A3D] text-white text-[8px] mb-1">
                      <Megaphone className="w-2.5 h-2.5 ml-0.5" />إعلان
                    </Badge>
                    <h3 className="text-sm font-bold text-white">{homeBanners[currentBanner]?.title}</h3>
                    <p className="text-[10px] text-gray-200">{homeBanners[currentBanner]?.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Dot indicators */}
              {homeBanners.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {homeBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentBanner(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentBanner ? "bg-[#1B7A3D] w-4" : "bg-white/50 w-1.5"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : ads.length > 0 ? (
          /* Fallback to general ads if no home banners */
          <div className="mb-4">
            <div className="relative rounded-2xl overflow-hidden card-shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAd}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[16/7] bg-white"
                >
                  <img
                    src={ads[currentAd]?.imageUrl || "/images/IMG-20260527-WA0043.jpg"}
                    alt={ads[currentAd]?.title || "إعلان"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-3">
                    <Badge className="bg-[#1B7A3D] text-white text-[8px] mb-1">
                      <Megaphone className="w-2.5 h-2.5 ml-0.5" />إعلان
                    </Badge>
                    <h3 className="text-sm font-bold text-white">{ads[currentAd]?.title}</h3>
                    <p className="text-[10px] text-gray-200">{ads[currentAd]?.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              {ads.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {ads.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentAd(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentAd ? "bg-[#1B7A3D] w-4" : "bg-white/50 w-1.5"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default ad when no banners or ads configured */
          <div className="mb-4">
            <div className="relative rounded-2xl overflow-hidden card-shadow-lg aspect-[16/7] bg-white">
              <img src="/images/IMG-20260527-WA0043.jpg" alt="إعلان" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <Badge className="bg-[#1B7A3D] text-white text-[8px] mb-1"><Megaphone className="w-2.5 h-2.5 ml-0.5" />إعلان</Badge>
                <h3 className="text-sm font-bold text-white">شرائح Apple.NET</h3>
                <p className="text-[10px] text-gray-200">سيعمل شريحة Apple.NET وسيبيعها بالاسواق قريباً!</p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            3. VENDING MACHINES — Networks with available cards nearby
            ══════════════════════════════════════════════════════════ */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#1B7A3D]" />
              </div>
              <div>
                <h2 className="text-base font-black text-gray-900">مكائن الكروت المتوفرة</h2>
                <p className="text-[10px] text-gray-400">الشبكات التي تحتوي كروت متاحة للبيع</p>
              </div>
            </div>
            <Badge className="bg-[#E8F5E9] text-[#1B7A3D] text-[9px]">{vendingNetworks.length} مكينة</Badge>
          </div>

          {/* Province / District quick filter for vending machines */}
          <div className="mb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => { setSelectedProvince(null); setSelectedDistrict(null); }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${!selectedProvince ? "bg-[#1B7A3D] text-white btn-green-shadow" : "bg-white text-gray-500 card-shadow"}`}
              >
                <Navigation className="w-3 h-3 inline ml-1" />الكل
              </button>
              {PROVINCES.map(province => {
                const count = fbNetworks.filter(n => n.provinceId === province.id && getAvailableCount(n.id) > 0).length;
                if (count === 0 && selectedProvince !== province.id) return null;
                return (
                  <button
                    key={province.id}
                    onClick={() => {
                      if (selectedProvince === province.id) {
                        setSelectedProvince(null);
                        setSelectedDistrict(null);
                      } else {
                        setSelectedProvince(province.id);
                        setSelectedDistrict(null);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                      selectedProvince === province.id ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-500 card-shadow"
                    }`}
                  >
                    🏛️ {province.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* District Filter */}
            <AnimatePresence>
              {selectedProvince && districts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="overflow-hidden mt-2"
                >
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button
                      onClick={() => setSelectedDistrict(null)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${!selectedDistrict ? "bg-[#1B7A3D] text-white btn-green-shadow" : "bg-white text-gray-500 card-shadow"}`}
                    >
                      الكل
                    </button>
                    {districts.map(d => {
                      const count = fbNetworks.filter(n => n.provinceId === selectedProvince && n.district === d && getAvailableCount(n.id) > 0).length;
                      if (count === 0 && selectedDistrict !== d) return null;
                      return (
                        <button
                          key={d}
                          onClick={() => setSelectedDistrict(selectedDistrict === d ? null : d)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                            selectedDistrict === d ? "bg-red-500 text-white shadow-md" : "bg-white text-gray-500 card-shadow"
                          }`}
                        >
                          📍 {d}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vending machines list */}
          <div className="space-y-2">
            {vendingNetworks.length === 0 ? (
              <div className="bg-white rounded-2xl card-shadow p-6 text-center">
                <Wifi className="w-10 h-10 mx-auto text-gray-200 mb-2" />
                <p className="text-gray-400 text-sm font-bold">لا توجد مكائن كروت متوفرة حالياً</p>
                <p className="text-gray-300 text-[10px] mt-1">
                  {selectedProvince ? "جرّب محافظة أخرى أو تحقق لاحقاً" : "سيتم إضافة كروت جديدة قريباً"}
                </p>
              </div>
            ) : (
              vendingNetworks.map((net, i) => {
                const availableCount = getAvailableCount(net.id);
                const cheapestCard = allCards
                  .filter(c => c.network === net.id && !c.isUsed)
                  .sort((a, b) => (a.price || 0) - (b.price || 0))[0];

                return (
                  <motion.div
                    key={net.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNetwork(net)}
                    className="bg-white rounded-2xl card-shadow p-4 cursor-pointer active:bg-gray-50 transition-colors border-r-4"
                    style={{ borderRightColor: net.color || "#1B7A3D" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl overflow-hidden"
                          style={{ backgroundColor: net.bgColor || (net.color + "1A") }}
                        >
                          {(net as Record<string, unknown>).imageBase64 ? (
                            <img
                              src={(net as Record<string, unknown>).imageBase64 as string}
                              alt={net.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <span>{net.emoji}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-black" style={{ color: net.color }}>{net.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            {net.provinceName && (
                              <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                                <Globe className="w-3 h-3" />{net.provinceName}
                              </span>
                            )}
                            {net.district && (
                              <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                                <MapPin className="w-3 h-3" />{net.district}
                              </span>
                            )}
                            {net.ownerPhone && (
                              <a
                                href={`https://wa.me/${net.ownerPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] text-blue-500 flex items-center gap-0.5 hover:underline"
                              >
                                <Phone className="w-3 h-3" />تواصل
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge className="bg-[#E8F5E9] text-[#1B7A3D] text-[10px] font-bold">{availableCount} كرت متاح</Badge>
                        {cheapestCard && (
                          <span className="text-[9px] text-gray-400">يبدأ من {cheapestCard.price?.toLocaleString()} ر.ي</span>
                        )}
                        <ChevronLeft className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            4. QUICK STATS
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { value: "99.9%", label: "نسبة النجاح", icon: TrendingUp },
            { value: "10K+", label: "مستخدم نشط", icon: Eye },
            { value: String(vendingNetworks.length), label: "مكينة متاحة", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 text-center card-shadow">
              <stat.icon className="w-4 h-4 mx-auto text-[#1B7A3D] mb-1" />
              <p className="text-lg font-black text-[#1B7A3D]">{stat.value}</p>
              <p className="text-[9px] text-gray-400 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════
            5. ALL NETWORKS (including those without available cards)
            ══════════════════════════════════════════════════════════ */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-gray-900">جميع الشبكات</h2>
            <Badge className="bg-[#E8F5E9] text-[#1B7A3D] text-[9px]">{filteredNetworks.length} شبكة</Badge>
          </div>
          <div className="space-y-2">
            {filteredNetworks.length === 0 ? (
              <div className="bg-white rounded-2xl card-shadow p-6 text-center">
                <Wifi className="w-10 h-10 mx-auto text-gray-200 mb-2" />
                <p className="text-gray-400 text-sm">لا توجد شبكات {selectedProvince ? "في هذه المحافظة" : ""}</p>
              </div>
            ) : (
              filteredNetworks.map((net, i) => {
                const availableCount = getAvailableCount(net.id);
                return (
                  <motion.div
                    key={net.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNetwork(net)}
                    className="bg-white rounded-2xl card-shadow p-3 cursor-pointer active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-base overflow-hidden"
                          style={{ backgroundColor: net.bgColor || (net.color + "1A") }}
                        >
                          {(net as Record<string, unknown>).imageBase64 ? (
                            <img
                              src={(net as Record<string, unknown>).imageBase64 as string}
                              alt={net.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                          ) : (
                            <span>{net.emoji}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xs font-black" style={{ color: net.color }}>{net.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            {net.provinceName && (
                              <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                                <Globe className="w-3 h-3" />{net.provinceName}
                              </span>
                            )}
                            {net.district && (
                              <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                                <MapPin className="w-3 h-3" />{net.district}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${availableCount > 0 ? "bg-[#E8F5E9] text-[#1B7A3D]" : "bg-gray-100 text-gray-400"} text-[9px]`}>
                        {availableCount > 0 ? `${availableCount} كرت` : "غير متاح"}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            6. QUICK SERVICES GRID
            ══════════════════════════════════════════════════════════ */}
        <div className="mb-5">
          <h2 className="text-base font-black text-gray-900 mb-3">الخدمات</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Wifi, label: "كروت", color: "bg-[#E8F5E9] text-[#1B7A3D]", action: () => onNavigate("cards") },
              { icon: CreditCard, label: "إيداع", color: "bg-blue-50 text-blue-500", action: () => onNavigate("deposit") },
              { icon: Smartphone, label: "شرائح", color: "bg-purple-50 text-purple-500", action: () => onNavigate("sims") },
              { icon: Building2, label: "بنوك", color: "bg-orange-50 text-orange-500", action: () => onNavigate("banks") },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-3 text-center card-shadow cursor-pointer haptic-press"
                onClick={item.action}
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-1.5`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-gray-700">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            7. SECONDARY AD (if multiple ads exist)
            ══════════════════════════════════════════════════════════ */}
        {ads.length > 1 && (
          <div className="space-y-3 mb-5">
            <div className="relative rounded-2xl overflow-hidden card-shadow-lg aspect-video bg-white">
              <img src="/images/IMG-20260527-WA0044.jpg" alt="إعلان" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <Badge className="bg-[#1B7A3D] text-white text-[8px] mb-1"><Megaphone className="w-2.5 h-2.5 ml-0.5" />عرض خاص</Badge>
                <h3 className="text-sm font-bold text-white">عروض حصرية</h3>
                <p className="text-[10px] text-gray-200">تابعنا للحصول على أحدث العروض والخصومات</p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            8. SIM CARD PREVIEW
            ══════════════════════════════════════════════════════════ */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-gray-900">شرائح SIM</h2>
            <Badge className="bg-[#E8F5E9] text-[#1B7A3D] text-[9px]">قريباً</Badge>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden card-shadow">
            <img src="/images/IMG-20260527-WA0042.jpg" alt="شريحة Apple.NET" className="w-full h-36 object-cover" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-900">شريحة Apple.NET</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">شريحة إنترنت عالية السرعة — متوفرة قريباً في الأسواق</p>
              <p className="text-[#1B7A3D] font-bold text-sm mt-1.5">5,000 ر.ي</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            9. DOWNLOAD APP BANNER
            ══════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#E6F9EE] to-[#D0F0DB] rounded-2xl overflow-hidden card-shadow mb-5 border border-[#1B7A3D]/15">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                  <img src="/images/IMG_20260527_220851.jpg" alt="Apple.NET" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1B7A3D] rounded-full flex items-center justify-center"><Download className="w-2.5 h-2.5 text-white" /></div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-gray-900">تطبيق Apple.NET</h3>
                <p className="text-[10px] text-gray-500">إدارة الهوت سبوت الاحترافي</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] bg-white/80 text-[#1B7A3D] font-bold px-1.5 py-0.5 rounded-full">APK</span>
                  <span className="text-[9px] text-gray-400">أندرويد</span>
                </div>
              </div>
            </div>
            {appDownloadUrl ? (
              <a href={appDownloadUrl} target="_blank" rel="noopener noreferrer" className="mt-3 w-full bg-gradient-to-l from-[#1B7A3D] to-[#22A24D] text-white font-bold rounded-xl h-10 flex items-center justify-center gap-1.5 text-sm btn-green-shadow haptic-press">
                <Download className="w-4 h-4" />تنزيل التطبيق
              </a>
            ) : null}
          </div>
        </div>

      </div>

      {/* Network Detail Modal */}
      <AnimatePresence>
        {selectedNetwork && (
          <NetworkDetailModal
            network={selectedNetwork}
            onClose={() => setSelectedNetwork(null)}
            allCards={allCards}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
