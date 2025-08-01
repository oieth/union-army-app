import { useEffect, useState, useRef } from "react";

// Language translations
const translations = {
  en: {
    unionSticker: "Union Sticker",
    twitterFrame: "Twitter Frame",
    twitterFrame2: "Twitter Frame 2",
    view: "View",
    download: "Download",
    unionStats: "Union Stats",
    unionLevel: "Union Level",
    unionXP: "Union XP",
    ceremony: "Ceremony",
    myNFTs: "My NFTs",
    confirm: "Confirm",
    enterUsername: "Enter X username",
    unionIsForEveryone: "Union is for everyone.",
    profileAlt: "User Profile",
    bigImageAlt: "Large Image",
    zkwasted: "ZKWASTED",
    zkgm: "ZKGM",
    language: "Language",
    placeholderUsername: "Enter X username",
    madeByOi: "Made by",
    oi: "Oi",
  },
  tr: {
    unionSticker: "Union Sticker",
    twitterFrame: "Twitter Çerçevesi",
    twitterFrame2: "Twitter Çerçevesi 2",
    view: "Görüntüle",
    download: "İndir",
    unionStats: "Union İstatistikleri",
    unionLevel: "Union Seviyesi",
    unionXP: "Union XP",
    ceremony: "Seremoni",
    myNFTs: "Benim NFTlerim",
    confirm: "Onayla",
    enterUsername: "X kullanıcı adını yaz",
    unionIsForEveryone: "Union herkes içindir.",
    profileAlt: "Kullanıcı Profil",
    bigImageAlt: "Büyük Görüntü",
    zkwasted: "ZKWASTED",
    zkgm: "ZKGM",
    language: "Dil",
    placeholderUsername: "X kullanıcı adını yaz",
    madeByOi: "Tarafından yapılmıştır",
    oi: "Oi",
  },
  ko: {
    unionSticker: "유니온 스티커",
    twitterFrame: "트위터 프레임",
    twitterFrame2: "트위터 프레임 2",
    view: "보기",
    download: "다운로드",
    unionStats: "유니온 통계",
    unionLevel: "유니온 레벨",
    unionXP: "유니온 XP",
    ceremony: "세레모니",
    myNFTs: "내 NFT",
    confirm: "확인",
    enterUsername: "X 사용자 이름 입력",
    unionIsForEveryone: "Union은 모두를 위한 것입니다.",
    profileAlt: "사용자 프로필",
    bigImageAlt: "큰 이미지",
    zkwasted: "ZKWASTED",
    zkgm: "ZKGM",
    language: "언어",
    placeholderUsername: "X 사용자 이름 입력",
    madeByOi: "Oi가 만듦",
    oi: "Oi",
  },
};

const nftList = [
  { key: "wws", name: "Wandering Whale Shark", img: "/nft-whale-shark.png" },
  { key: "zkgm", name: "ZK Goblin Mode", img: "/nft-goblin-mode.png" },
  { key: "v", name: "V-On-Vana", img: "/nft-v-on-vana.png" },
  { key: "raccoon", name: "Raccoons", img: "/nft-raccoons.png" },
  { key: "mad", name: "Mad Scientists", img: "/nft-mad-scientists.png" },
  { key: "sloth", name: "Celestine Sloth", img: "/nft-celestine-sloth.png" },
  { key: "badkids", name: "Bad Kids", img: "/nft-bad-kids.png" },
  { key: "mammoth", name: "Mammoth Overlord", img: "/nft-mammoth-overlord.png" },
];

const levelNames = [
  "Conscript",
  "Private First Class",
  "Junior Sergeant",
  "Sergeant",
  "Senior Sergeant",
  "Starshina",
  "Junior Lieutenant",
  "Lieutenant",
  "Senior Lieutenant",
  "Junior Captain",
  "Captain",
  "Senior Captain",
];
const languageOptions = [
  { code: "en", img: "/flags/en.png", label: "EN" },
  { code: "tr", img: "/flags/tr.png", label: "TR" },
  { code: "ko", img: "/flags/ko.png", label: "KO" },
];
// Bilgi baloncukları metinleri üç dilde
const infoTexts = {
  sticker: {
    en: "You can use this sticker anywhere you wish.",
    tr: "Bu stickerı dilediğiniz her yerde kullanabilirsiniz.",
    ko: "이 스티커는 어디서든 사용할 수 있습니다.",
  },
  frame: {
    en: "You can add awesome frames to your profile photo from here.",
    tr: "Buradan profil fotoğrafınıza harika çerçeveler takabilirsiniz.",
    ko: "여기서 프로필 사진에 멋진 프레임을 추가할 수 있습니다.",
  },
  stats: {
    en: "⬆️Look at your Union Card⬆️",
    tr: "⬆️Union Kartına Bak.⬆️",
    ko: "⬆️유니온 카드를 확인하세요⬆️",
  },
};

function getLevelName(level) {
  const num = parseInt(level);
  if (!isNaN(num) && num >= 1 && num <= levelNames.length) {
    return levelNames[num - 1];
  }
  return "";
}

export default function Home() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#000";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.background = "#000";
  }, []);

  const [username, setUsername] = useState("");
  const [profileImgSrc, setProfileImgSrc] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", bio: "", followers: 0 });
  const [showUnionStats, setShowUnionStats] = useState(false);
  const [level, setLevel] = useState("");
  const [xp, setXp] = useState("");
  const [ceremony, setCeremony] = useState(null);
  const [viewingImageSrc, setViewingImageSrc] = useState(null);
  const [selectedNFTs, setSelectedNFTs] = useState({
    wws: false,
    zkgm: false,
    v: false,
    raccoon: false,
    mad: false,
    sloth: false,
    badkids: false,
    mammoth: false,
  });
  const zkgmAudioRef = useRef(null);
  const zkgmBtnRef = useRef(null);
  const [showZkwasted, setShowZkwasted] = useState(false);

  // Twitter Frame Selection
  const [twitterFrameIdx, setTwitterFrameIdx] = useState(0);
  const twitterFrames = [
    { src: "/twitter-frame-1.png", labelKey: "twitterFrame" },
    { src: "/twitter-frame-2.png", labelKey: "twitterFrame2" }
  ];

  // Language state
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  useEffect(() => {
    const btn = zkgmBtnRef.current;
    if (!btn) return;
    let i = 0;
    const colors = [
      "rgba(0, 255, 242, 1)",
      "rgba(0, 255, 179, 1)",
      "rgba(0, 255, 64, 1)",
      "rgba(238, 255, 0, 1)",
      "rgba(255, 136, 0, 1)",
      "rgba(0, 38, 255, 1)",
    ];
    const interval = setInterval(() => {
      btn.style.background = colors[i % colors.length];
      i++;
    }, 350);
    return () => clearInterval(interval);
  }, []);

  const fetchProfile = () => {
    if (!username.trim()) {
      alert(t.enterUsername);
      return;
    }
    const user = username.trim().toLowerCase();

    const profileUrl = `https://unavatar.io/x/${user}`;
    setProfileImgSrc(null);
    setUserInfo({ name: "", bio: "", followers: 0 });

    fetch(profileUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.blob();
      })
      .then((blob) => {
        const imgUrl = URL.createObjectURL(blob);
        setProfileImgSrc(imgUrl);
      })
      .catch(() => {
        setProfileImgSrc("/default-profile.png");
      });

    fetch(
      `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const d = data[0];
          setUserInfo({
            name: d.name || user,
            bio: d.description || "",
            followers: d.followers_count || 0,
          });
        } else {
          setUserInfo({
            name: user,
            bio: "",
            followers: 0,
          });
        }
      })
      .catch(() => {
        setUserInfo({
          name: user,
          bio: "",
          followers: 0,
        });
      });

    setShowUnionStats(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchProfile();
    }
  };

  useEffect(() => {
    if (!profileImgSrc) return;

    // Canvas1 - Union Sticker
    const canvas1 = document.getElementById("canvas1");
    const ctx1 = canvas1.getContext("2d");
    const profileImg = new Image();
    profileImg.crossOrigin = "anonymous";
    profileImg.src = profileImgSrc;

    profileImg.onload = () => {
      canvas1.width = 260;
      canvas1.height = 260;
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      ctx1.drawImage(profileImg, 0, 0, 260, 260);

      const unionSticker = new Image();
      unionSticker.src = "/union-logo.png";
      unionSticker.onload = () => {
        const w = 260;
        const h = 60;
        const y = 260 - h;
        ctx1.drawImage(unionSticker, 0, y, w, h);
      };
    };

    // Canvas2 - Twitter Frame
    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext("2d");
    const twitterFrame = new Image();
    twitterFrame.src = twitterFrames[twitterFrameIdx].src;

    twitterFrame.onload = () => {
      canvas2.width = twitterFrame.width;
      canvas2.height = twitterFrame.height;

      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

      const centerX = canvas2.width / 2;
      const centerY = canvas2.height / 2;
      const radius = Math.min(canvas2.width, canvas2.height) / 2;

      ctx2.save();
      ctx2.beginPath();
      ctx2.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx2.closePath();
      ctx2.clip();

      ctx2.drawImage(profileImg, 0, 0, canvas2.width, canvas2.height);
      ctx2.restore();

      ctx2.drawImage(twitterFrame, 0, 0);
    };

    // Canvas3 - Stats
    if (showUnionStats) {
      const canvas3 = document.getElementById("canvas3");
      const ctx3 = canvas3.getContext("2d");
      const statImg = new Image();
      statImg.src = "/stat.png";

      statImg.onload = () => {
        canvas3.width = statImg.width;
        canvas3.height = statImg.height;

        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        ctx3.drawImage(statImg, 0, 0);

        const profImgLarge = new window.Image();
        profImgLarge.crossOrigin = "anonymous";
        profImgLarge.src = profileImgSrc;

        profImgLarge.onload = () => {
          const imgW = 1300;
          const imgH = 1300;
          const imgX = (canvas3.width - imgW) / 2;
          const imgY = 320;

          ctx3.drawImage(profImgLarge, imgX, imgY, imgW, imgH);

          ctx3.fillStyle = "#fff";
          ctx3.font = "bold 110px Arial";
          ctx3.textAlign = "center";
          ctx3.textBaseline = "top";
          ctx3.fillText(
            userInfo.name || username || "",
            canvas3.width / 2,
            imgY + imgH + 40
          );

          const infoBaseY = imgY + imgH + 230;
          const infoX = 100;

          // Always use English for card texts
          const tCard = translations["en"];

          ctx3.font = "bold 140px Arial";
          ctx3.textAlign = "left";
          ctx3.fillStyle = "#fff";
          ctx3.fillText(`${tCard.unionLevel}:`, infoX, infoBaseY);

          ctx3.font = "bold 140px Arial";
          ctx3.textAlign = "left";
          ctx3.fillStyle = "#ffd700";
          ctx3.fillText(getLevelName(level), infoX + 850, infoBaseY);

          ctx3.font = "bold 140px Arial";
          ctx3.textAlign = "left";
          ctx3.fillStyle = "#fff";
          ctx3.fillText(`${tCard.unionLevel}: ${level || "-"}`, infoX, infoBaseY + 180);
          ctx3.fillText(`${tCard.unionXP}: ${xp || "-"}`, infoX, infoBaseY + 360);

          const ceremonyBoxW = 120;
          const ceremonyBoxH = 120;
          const ceremonyY = infoBaseY + 540;
          const ceremonyTextX = infoX;
          const ceremonyBoxX = ceremonyTextX + 750;

          ctx3.font = "bold 140px Arial";
          ctx3.textAlign = "left";
          ctx3.textBaseline = "middle";
          ctx3.fillStyle = "#fff";
          ctx3.fillText(`${tCard.ceremony}:`, ceremonyTextX, ceremonyY + ceremonyBoxH / 2);

          ctx3.strokeStyle = "#fff";
          ctx3.lineWidth = 6;
          ctx3.strokeRect(ceremonyBoxX, ceremonyY, ceremonyBoxW, ceremonyBoxH);

          if (ceremony === true) {
            ctx3.fillStyle = "#00ff00";
            ctx3.fillRect(
              ceremonyBoxX + 6,
              ceremonyY + 6,
              ceremonyBoxW - 12,
              ceremonyBoxH - 12
            );
            ctx3.fillStyle = "#fff";
            ctx3.font = "bold 100px Arial";
            ctx3.textAlign = "center";
            ctx3.fillText(
              "✓",
              ceremonyBoxX + ceremonyBoxW / 2,
              ceremonyY + ceremonyBoxH / 2
            );
          } else if (ceremony === false) {
            ctx3.fillStyle = "#ff0000";
            ctx3.fillRect(
              ceremonyBoxX + 6,
              ceremonyY + 6,
              ceremonyBoxW - 12,
              ceremonyBoxH - 12
            );
            ctx3.fillStyle = "#fff";
            ctx3.font = "bold 100px Arial";
            ctx3.textAlign = "center";
            ctx3.fillText(
              "✗",
              ceremonyBoxX + ceremonyBoxW / 2,
              ceremonyY + ceremonyBoxH / 2
            );
          }

          ctx3.font = "bold 120px Arial";
          ctx3.textAlign = "left";
          ctx3.fillStyle = "#fff";
          const nftTitleY = ceremonyY + ceremonyBoxH + 120;
          ctx3.fillText(`${tCard.myNFTs}:`, infoX, nftTitleY);

          const selectedKeys = nftList.filter(nft => selectedNFTs[nft.key]);
          const maxPerRow = 6;
          const nftSize = 240;
          const nftGap = 55;
          const startX = infoX;
          const startY = nftTitleY + 85;

          selectedKeys.forEach((nft, idx) => {
            const row = Math.floor(idx / maxPerRow);
            const col = idx % maxPerRow;
            const x = startX + col * (nftSize + nftGap);
            const y = startY + row * (nftSize + nftGap);

            const nftImg = new window.Image();
            nftImg.src = nft.img;
            nftImg.onload = () => {
              ctx3.save();
              ctx3.strokeStyle = "#fff";
              ctx3.lineWidth = 8;
              ctx3.beginPath();
              ctx3.rect(x, y, nftSize, nftSize);
              ctx3.stroke();
              ctx3.closePath();
              ctx3.restore();

              ctx3.drawImage(nftImg, x + 10, y + 10, nftSize - 20, nftSize - 20);
            };
          });
        };
      };
    }
  }, [
    profileImgSrc,
    showUnionStats,
    level,
    xp,
    ceremony,
    userInfo.name,
    username,
    selectedNFTs,
    lang,
    twitterFrameIdx
  ]);

  const downloadCanvas = (canvasId, filename) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const viewCanvas = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    setViewingImageSrc(url);
  };

  const closeViewingModal = () => {
    setViewingImageSrc(null);
  };

  const playZkgm = () => {
    if (!zkgmAudioRef.current) {
      zkgmAudioRef.current = new window.Audio("/zkgm.mp3");
    }
    const audio = zkgmAudioRef.current;
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 6000);
  };

  const closeZkwasted = () => {
    setShowZkwasted(false);
  };

  const handleNFTChange = (key) => {
    setSelectedNFTs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Top Title - Sade */}
      <div
        style={{
          width: "100vw",
          textAlign: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100001,
          background: "none",
          padding: "0.6rem 0 0.2rem 0",
          fontSize: "1.3rem",
          fontWeight: "700",
          color: "#1DA1F2",
          letterSpacing: "1px",
          boxShadow: "none",
          pointerEvents: "none",
        }}
      >
        $U
      </div>

      {/* Language Switcher */}
      <div
        style={{
          position: "fixed",
          top: "30px",
          right: "30px",
          zIndex: 100000,
          display: "flex",
          gap: "10px",
        }}
      >
        {languageOptions.map((opt) => (
  <button
    key={opt.code}
    onClick={() => setLang(opt.code)}
    style={{
      padding: "0.4rem 0.7rem",
      borderRadius: "12px",
      border: lang === opt.code ? "3px solid #1DA1F2" : "2px solid #555",
      background: lang === opt.code ? "#1DA1F2" : "#222",
      cursor: "pointer",
      transition: "background 0.2s, border 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
    }}
  >
    <img
      src={opt.img}
      alt={opt.label}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        objectFit: "cover",
        border: lang === opt.code ? "2px solid #fff" : "2px solid #222",
        boxShadow: lang === opt.code ? "0 0 6px #fff" : "none",
        background: "#fff",
      }}
    />
  </button>
))}
      </div>

      {/* ZKWASTED Video Modal */}
      {showZkwasted && (
        <div
          onClick={closeZkwasted}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            zIndex: 10001,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <video
            src="/zkwasted.mp4"
            autoPlay
            controls
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "20px",
              boxShadow: "0 0 30px #00eeffff",
              background: "#000",
              outline: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div
        style={{
          textAlign: "center",
          padding: 0,
          backgroundImage: 'url("/arka-plan-gorseli.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          minWidth: "100vw",
          width: "100vw",
          height: "100vh",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
          margin: 0,
          boxSizing: "border-box",
          transition: "opacity 0.5s",
          opacity: showZkwasted ? 0.3 : 1,
          paddingTop: "5.5rem",
          backgroundColor: "#000",
        }}
      >
        <div style={{ marginBottom: "1rem", marginTop: "3.5rem" }}>
          {/* Arama kutusunun hemen altına, profil yoksa göster */}
{!profileImgSrc && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      minHeight: "50vh",
    }}
  >
    <img
      src="/welcome-image.png"
      alt="Welcome"
      style={{
        width: "700px",
        height: "300px",
        objectFit: "contain",
        marginBottom: "1.5rem",
        opacity: 0.92,
      }}
    />
    <div
      style={{
        fontSize: "1.35rem",
        color: "#fff",
        textShadow: "0 0 10px #0009",
        fontWeight: "600",
        textAlign: "center",
        maxWidth: "420px",
        lineHeight: "1.5",
      }}
    >
      {lang === "tr"
        ? "X hesabını aşağı yazıp Union Army'i keşfetmeye başla!"
        : lang === "en"
        ? "Enter your X username below and start exploring the Union Army!"
        : "아래에 X 사용자 이름을 입력하고 Union 탐험을 시작하세요!"}
    </div>
  </div>
)}<input
          
            type="text"
            placeholder={t.placeholderUsername}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: "0.7rem 1.2rem",
              fontSize: "1.3rem",
              borderRadius: "30px",
              border: "2px solid #1DA1F2",
              outline: "none",
              width: "280px",
              maxWidth: "90vw",
              marginRight: "0.5rem",
              boxShadow: "0 2px 5px rgba(29,161,242,0.4)",
              color: "#333",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0d8ddb")}
            onBlur={(e) => (e.target.style.borderColor = "#1DA1F2")}
          />
          <button
            onClick={fetchProfile}
            style={{
              padding: "0.7rem 2rem",
              fontSize: "1.3rem",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#1DA1F2",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(29,161,242,0.6)",
              fontWeight: "700",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0d8ddb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
          >
            {t.confirm}
          </button>
        </div>

        {profileImgSrc && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6rem",
                flexWrap: "wrap",
                marginBottom: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
            >
              {/* Canvas 1 */}
              <div style={{ textAlign: "center", marginRight: "100px", position: "relative" }}>
                <p
                  style={{
                    color: "#fff",
                    textShadow: "0 0 5px rgba(0,0,0,0.7)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t.unionSticker}
                </p>
                <canvas
                  id="canvas1"
                  width={260}
                  height={260}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    width: "280px",
                    height: "280px",
                    display: "block",
                    margin: "0 auto",
                  }}
                ></canvas>
                <div
                  style={{
                    marginTop: "0.6rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    position: "relative",
                  }}
                >
                  {/* Bilgi baloncuğu */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#1DA1F2",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        lineHeight: "24px",
                        textAlign: "center",
                        cursor: "pointer",
                        marginRight: "5px",
                        boxShadow: "0 1px 6px #1DA1F280",
                        position: "relative",
                      }}
                      tabIndex={0}
                      onMouseEnter={e =>
                        e.currentTarget.nextSibling.style.opacity = 1
                      }
                      onMouseLeave={e =>
                        e.currentTarget.nextSibling.style.opacity = 0
                      }
                      onFocus={e =>
                        e.currentTarget.nextSibling.style.opacity = 1
                      }
                      onBlur={e =>
                        e.currentTarget.nextSibling.style.opacity = 0
                      }
                    >ℹ️</span>
                    <span
                      style={{
                        position: "absolute",
                        left: "34px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#222",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "7px 12px",
                        whiteSpace: "nowrap",
                        fontSize: "0.95rem",
                        boxShadow: "0 0 8px #1DA1F2cc",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: "opacity 0.2s",
                        zIndex: 10,
                        minWidth: "200px",
                        maxWidth: "260px",
                      }}
                    >
                      {infoTexts.sticker[lang]}
                    </span>
                  </div>
                  <button
                    onClick={() => viewCanvas("canvas1")}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      fontWeight: "700",
                      borderRadius: "15px",
                      border: "none",
                      backgroundColor: "#1DA1F2",
                      color: "white",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0d8ddb")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1DA1F2")
                    }
                  >
                    {t.view}
                  </button>
                  <button
                    onClick={() => downloadCanvas("canvas1", "union-sticker.png")}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      fontWeight: "700",
                      borderRadius: "15px",
                      border: "none",
                      backgroundColor: "#00ff73ff",
                      color: "white",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#01ce5dff")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#00ff73ff")
                    }
                  >
                    {t.download}
                  </button>
                </div>
              </div>

              {/* Profile and info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "320px",
                  borderRadius: "20px",
                  padding: "1rem",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  boxShadow: "0 0 15px #1DA1F2",
                }}
              >
                <img
                  src={profileImgSrc}
                  alt={t.profileAlt}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #1DA1F2",
                    marginBottom: "0.6rem",
                  }}
                />
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "1.4rem",
                    color: "#fff",
                    textShadow: "0 0 5px rgba(0,0,0,0.7)",
                    textAlign: "center",
                    marginBottom: "0.4rem",
                  }}
                >
                  {userInfo.name || "@username"}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "#ddd",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    lineHeight: "1.3",
                    textShadow: "0 0 3px rgba(0,0,0,0.7)",
                    textAlign: "center",
                    marginBottom: "0.7rem",
                    maxWidth: "300px",
                  }}
                >
                  {t.unionIsForEveryone}
                </div>
              </div>

              {/* Canvas 2 - Twitter Frame */}
              <div style={{ textAlign: "center", marginLeft: "100px", position: "relative" }}>
                <p
                  style={{
                    color: "#fff",
                    textShadow: "0 0 5px rgba(0,0,0,0.7)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t[twitterFrames[twitterFrameIdx].labelKey]}
                </p>
                {/* Twitter Frame Selector */}
                <div style={{ marginBottom: "0.5rem" }}>
                  {twitterFrames.map((frame, idx) => (
                    <button
                      key={frame.src}
                      onClick={() => setTwitterFrameIdx(idx)}
                      style={{
                        margin: "0 0.25rem",
                        padding: "0.35rem 0.6rem",
                        borderRadius: "10px",
                        border: twitterFrameIdx === idx ? "2px solid #1DA1F2" : "1px solid #555",
                        background: twitterFrameIdx === idx ? "#1DA1F2" : "#222",
                        color: "#fff",
                        fontWeight: twitterFrameIdx === idx ? "700" : "500",
                        cursor: "pointer",
                        fontSize: "1rem",
                        boxShadow: twitterFrameIdx === idx ? "0 0 10px #1DA1F2" : "none",
                      }}
                    >
                      {t[frame.labelKey]}
                    </button>
                  ))}
                </div>
                <canvas
                  id="canvas2"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    width: "280px",
                    height: "280px",
                    display: "block",
                    margin: "0 auto",
                  }}
                ></canvas>
                <div
                  style={{
                    marginTop: "0.6rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    position: "relative",
                  }}
                >
                  {/* Bilgi baloncuğu */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#1DA1F2",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        lineHeight: "24px",
                        textAlign: "center",
                        cursor: "pointer",
                        marginRight: "5px",
                        boxShadow: "0 1px 6px #1DA1F280",
                        position: "relative",
                      }}
                      tabIndex={0}
                      onMouseEnter={e =>
                        e.currentTarget.nextSibling.style.opacity = 1
                      }
                      onMouseLeave={e =>
                        e.currentTarget.nextSibling.style.opacity = 0
                      }
                      onFocus={e =>
                        e.currentTarget.nextSibling.style.opacity = 1
                      }
                      onBlur={e =>
                        e.currentTarget.nextSibling.style.opacity = 0
                      }
                    >ℹ️</span>
                    <span
                      style={{
                        position: "absolute",
                        left: "34px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#222",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "7px 12px",
                        whiteSpace: "nowrap",
                        fontSize: "0.95rem",
                        boxShadow: "0 0 8px #1DA1F2cc",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: "opacity 0.2s",
                        zIndex: 10,
                        minWidth: "200px",
                        maxWidth: "260px",
                      }}
                    >
                      {infoTexts.frame[lang]}
                    </span>
                  </div>
                  <button
                    onClick={() => viewCanvas("canvas2")}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      fontWeight: "700",
                      borderRadius: "15px",
                      border: "none",
                      backgroundColor: "#1DA1F2",
                      color: "white",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0d8ddb")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1DA1F2")
                    }
                  >
                    {t.view}
                  </button>
                  <button
                    onClick={() =>
                      downloadCanvas("canvas2", `twitter-frame${twitterFrameIdx+1}.png`)
                    }
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      fontWeight: "700",
                      borderRadius: "15px",
                      border: "none",
                      backgroundColor: "#00ff73ff",
                      color: "white",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#01ce5dff")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#00ff73ff")
                    }
                  >
                    {t.download}
                  </button>
                </div>
              </div>
            </div>

            {/* Union Stats Button */}
            {profileImgSrc && (
              <div
                style={{
                  maxWidth: "360px",
                  margin: "2rem auto 0 auto",
                  padding: "1.5rem",
                  borderRadius: "25px",
                  backgroundColor: "rgba(0, 183, 255, 0.2)",
                  boxShadow: "0 0 25px rgba(0, 153, 255, 1)",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setShowUnionStats(true)}
                  style={{
                    width: "100%",
                    padding: "1.2rem 2rem",
                    fontSize: "1.7rem",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: "#19a8e0ff",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0, 204, 255, 0.7)",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#009cccff")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#0093b8ff")
                  }
                >
                  {t.unionStats}
                </button>
                {/* Union Stats Bilgi yazısı */}
                <div
                  style={{
                    marginTop: "1.3rem",
                    color: "#fff",
                    fontSize: "1.12rem",
                    background: "rgba(0,0,0,0.55)",
                    borderRadius: "9px",
                    padding: "0.75rem 1.2rem",
                    display: "inline-block",
                    boxShadow: "0 1px 8px #1DA1F285",
                  }}
                >
                  {infoTexts.stats[lang]}
                </div>
              </div>
            )}
          </>
        )}

        {/* Union Stats Modal */}
        {showUnionStats && (
          <div
            onClick={() => setShowUnionStats(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "90vw",
                maxWidth: "900px",
                height: "80vh",
                backgroundColor: "#111",
                padding: "2rem",
                borderRadius: "20px",
                boxShadow: "0 0 30px #00c5f7ff",
                display: "flex",
                gap: "2rem",
                cursor: "default",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", width: "60%", height: "100%" }}>
                <canvas
                  id="canvas3"
                  style={{
                    flexShrink: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px",
                    display: "block",
                    objectFit: "contain",
                    boxShadow: "0 0 15px #00c5f7ff",
                    backgroundColor: "#222",
                  }}
                ></canvas>
              </div>

              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "1rem",
                  position: "relative",
                  height: "100%",
                }}
              >
                <label
                  style={{ color: "#fff", fontWeight: "700", fontSize: "1.5rem" }}
                >
                  {t.unionLevel}:
                  <input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    style={{
                      marginLeft: "1rem",
                      padding: "0.5rem 1rem",
                      fontSize: "1.3rem",
                      borderRadius: "10px",
                      border: "1px solid #555",
                      backgroundColor: "#222",
                      color: "#fff",
                      outline: "none",
                      width: "80%",
                    }}
                  />
                </label>

                <label
                  style={{ color: "#fff", fontWeight: "700", fontSize: "1.5rem" }}
                >
                  {t.unionXP}:
                  <input
                    type="text"
                    value={xp}
                    onChange={(e) => setXp(e.target.value)}
                    style={{
                      marginLeft: "1rem",
                      padding: "0.5rem 1rem",
                      fontSize: "1.3rem",
                      borderRadius: "10px",
                      border: "1px solid #555",
                      backgroundColor: "#222",
                      color: "#fff",
                      outline: "none",
                      width: "80%",
                    }}
                  />
                </label>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1.2rem" }}>
                  <span style={{ color: "#fff", fontWeight: "700", fontSize: "1.5rem" }}>{t.ceremony}:</span>
                  <button
                    onClick={() => setCeremony(true)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      border: ceremony === true ? "3px solid #00ff00" : "2px solid #555",
                      background: ceremony === true ? "#00ff00" : "#222",
                      color: "#fff",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background 0.2s, border 0.2s",
                    }}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setCeremony(false)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      border: ceremony === false ? "3px solid #ff0000" : "2px solid #555",
                      background: ceremony === false ? "#ff0000" : "#222",
                      color: "#fff",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background 0.2s, border 0.2s",
                    }}
                  >
                    ✗
                  </button>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <span style={{ color: "#fff", fontWeight: "700", fontSize: "1.5rem" }}>{t.myNFTs}:</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      marginTop: "1rem",
                      maxHeight: "260px",
                      overflowY: "auto",
                      paddingRight: "8px",
                    }}
                  >
                    {nftList.map((nft) => (
                      <label
                        key={nft.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          background: selectedNFTs[nft.key] ? "#222" : "transparent",
                          borderRadius: "10px",
                          padding: "0.3rem 0.6rem",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedNFTs[nft.key]}
                          onChange={() => handleNFTChange(nft.key)}
                          style={{ transform: "scale(1.3)" }}
                        />
                        <img
                          src={nft.img}
                          alt={nft.name}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            objectFit: "cover",
                            border: selectedNFTs[nft.key] ? "2px solid #1DA1F2" : "2px solid #444",
                            boxShadow: selectedNFTs[nft.key] ? "0 0 8px #1DA1F2" : "none",
                          }}
                        />
                        <span style={{ color: "#fff", fontWeight: "600", fontSize: "1.1rem" }}>
                          {nft.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    display: "flex",
                    gap: "1rem",
                    margin: "0.1rem",
                  }}
                >
                  <button
                    onClick={() => downloadCanvas("canvas3", "union-stats.png")}
                    style={{
                      padding: "0.8rem 2.5rem",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      borderRadius: "15px",
                      border: "none",
                      backgroundColor: "#0099ffff",
                      color: "#fff",
                      boxShadow: "0 2px 8px #0099ffff",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#00b7ffff")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#00b7ffff")
                    }
                  >
                    {t.download}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {viewingImageSrc && (
        <div
          onClick={closeViewingModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            cursor: "pointer",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          <img
            src={viewingImageSrc}
            alt={t.bigImageAlt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "20px",
              boxShadow: "0 0 30px #1DA1F2",
              cursor: "default",
            }}
          />
        </div>
      )}

      {/* Bottom right: Made by Oi */}
      <div
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          zIndex: 99999,
          textAlign: "right",
        }}
      >
        <div
          style={{
            position: "fixed",
            right: "30px",
            bottom: "30px",
            zIndex: 99999,
            textAlign: "right",
            fontSize: "1.1rem",
            color: "#fff",
            fontWeight: "600",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "8px",
            padding: "0.2rem 0.7rem",
            display: "inline-block",
            cursor: "pointer",
          }}
          onClick={() => window.open("https://x.com/oinomaoseth", "_blank")}
        >
          {t.madeByOi} <span style={{
            color: "#00ffeaff",
            fontWeight: "bold",
            fontSize: "2.2rem",
            marginLeft: "4px",
          }}>{t.oi}</span>
        </div>
      </div>

      {/* ZKWASTED & ZKGM Buttons */}
      <div
        style={{
          position: "fixed",
          left: "30px",
          bottom: "30px",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <button
          style={{
            padding: "0.05px 0.2px",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "30px",
            border: "none",
            color: "#fff",
            boxShadow: "0 0 10px #00a2ffff",
            cursor: "pointer",
            transition: "background 0.3s",
            outline: "none",
            letterSpacing: "0.5px",
            textShadow: "0 0 8px #000",
            background: "linear-gradient(90deg, #ff0000, #ff9900, #fff700, #00ff00, #00fff7, #1DA1F2, #ff00ff)",
          }}
          onClick={() => setShowZkwasted(true)}
        >
          {t.zkwasted}
        </button>
        <button
          ref={zkgmBtnRef}
          style={{
            padding: "0.05px 0.2px",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "30px",
            border: "none",
            color: "#fff",
            boxShadow: "0 0 10px #fff",
            cursor: "pointer",
            transition: "background 0.3s",
            outline: "none",
            letterSpacing: "0.5px",
            textShadow: "0 0 8px #000",
          }}
          onClick={playZkgm}
        >
          {t.zkgm}
        </button>
      </div>
    </>
  );
}