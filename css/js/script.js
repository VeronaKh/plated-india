import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  Sparkles,
  Star,
  Trophy,
  Utensils,
  X,
} from "lucide-react";

/* =========================================================
   PLATED INDIA
   Main application
========================================================= */

const IMAGE_BASE = "/images";

const images = {
  hero: `${IMAGE_BASE}/dish-1.png`,
  bowl: `${IMAGE_BASE}/dish-2.png`,
  pasta: `${IMAGE_BASE}/dish-3.png`,
  creamy: `${IMAGE_BASE}/dish-4.png`,
};

/* =========================================================
   MENU DATA

   Replace the placeholder names/prices with the restaurant's
   final menu information.
========================================================= */

const menuCategories = [
  {
    id: "starters",
    label: "Starters",
    items: [
      {
        name: "Signature Chicken",
        description:
          "Tenderly prepared chicken with fragrant spices and a modern Plated touch.",
        price: "€14",
        image: images.hero,
        tags: ["Chef's pick"],
      },
      {
        name: "Crispy Chicken Bites",
        description:
          "Golden, crispy chicken served with a creamy house-style accompaniment.",
        price: "€12",
        image: images.bowl,
        tags: [],
      },
      {
        name: "House Special",
        description:
          "A generous plate inspired by the bold flavours of contemporary Indian dining.",
        price: "€13",
        image: images.pasta,
        tags: [],
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      {
        name: "Plated Signature",
        description:
          "A beautifully balanced main created around rich spices, texture and comfort.",
        price: "€19",
        image: images.hero,
        tags: ["Signature"],
      },
      {
        name: "Creamy Chicken",
        description:
          "Tender chicken in a rich, silky sauce with aromatic seasoning.",
        price: "€18",
        image: images.creamy,
        tags: [],
      },
      {
        name: "Indian Inspired Bowl",
        description:
          "A colourful combination of protein, rice, fresh vegetables and flavour.",
        price: "€17",
        image: images.bowl,
        tags: [],
      },
    ],
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
    items: [
      {
        name: "Garden Plate",
        description:
          "Fresh vegetables, aromatic rice and warming spices brought together beautifully.",
        price: "€16",
        image: images.bowl,
        tags: ["Vegetarian"],
      },
      {
        name: "Creamy Vegetable Bowl",
        description:
          "Comforting textures with fragrant herbs and a delicate house sauce.",
        price: "€15",
        image: images.creamy,
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "bowls",
    label: "Bowls",
    items: [
      {
        name: "Plated Bowl",
        description:
          "A generous bowl layered with flavour, colour and carefully prepared ingredients.",
        price: "€17",
        image: images.bowl,
        tags: ["Popular"],
      },
      {
        name: "Golden Chicken Bowl",
        description:
          "Juicy chicken, rice and fresh accompaniments with a beautifully spiced finish.",
        price: "€18",
        image: images.hero,
        tags: [],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Sweet Finish",
        description:
          "A delicate dessert designed to finish your Plated experience.",
        price: "€8",
        image: images.creamy,
        tags: [],
      },
      {
        name: "House Dessert",
        description:
          "A seasonal sweet creation prepared with care.",
        price: "€8",
        image: images.pasta,
        tags: [],
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      {
        name: "Fresh House Drink",
        description:
          "A refreshing accompaniment made to complement the menu.",
        price: "€6",
        image: images.bowl,
        tags: [],
      },
      {
        name: "Classic Refreshment",
        description:
          "A crisp and refreshing choice for your table.",
        price: "€5",
        image: images.hero,
        tags: [],
      },
    ],
  },
];

/* =========================================================
   LOYALTY
========================================================= */

const wheelPrizes = [
  {
    label: "10% OFF",
    code: "PLATED10",
  },
  {
    label: "FREE DESSERT",
    code: "PLATEDDESSERT",
  },
  {
    label: "FREE DRINK",
    code: "PLATEDDRINK",
  },
  {
    label: "15% OFF",
    code: "PLATED15",
  },
  {
    label: "FREE SIDE",
    code: "PLATEDSIDE",
  },
  {
    label: "TRY AGAIN",
    code: null,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [page]);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMobileOpen(false);
    scrollToTop();
  };

  return (
    <div className="site">
      <Navbar
        page={page}
        navigate={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        openReservation={() => setShowReservationModal(true)}
      />

      <main>
        {page === "home" && (
          <HomePage
            navigate={navigate}
            openLoyalty={() => setShowLoyaltyModal(true)}
            openReservation={() => setShowReservationModal(true)}
          />
        )}

        {page === "menu" && (
          <MenuPage
            openReservation={() => setShowReservationModal(true)}
          />
        )}

        {page === "story" && (
          <StoryPage
            navigate={navigate}
            openReservation={() => setShowReservationModal(true)}
          />
        )}

        {page === "loyalty" && (
          <LoyaltyPage
            openLoyalty={() => setShowLoyaltyModal(true)}
            navigate={navigate}
          />
        )}

        {page === "wheel" && (
          <WheelPage />
        )}

        {page === "contact" && (
          <ContactPage
            openReservation={() => setShowReservationModal(true)}
          />
        )}
      </main>

      <Footer navigate={navigate} />

      {showLoyaltyModal && (
        <LoyaltyModal
          close={() => setShowLoyaltyModal(false)}
        />
      )}

      {showReservationModal && (
        <ReservationModal
          close={() => setShowReservationModal(false)}
        />
      )}
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  page,
  navigate,
  mobileOpen,
  setMobileOpen,
  openReservation,
}) {
  const links = [
    ["home", "Home"],
    ["menu", "Menu"],
    ["story", "Our Story"],
    ["loyalty", "Plated Circle"],
    ["contact", "Contact"],
  ];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Plated India home"
        >
          <span className="brand-mark">P</span>

          <span className="brand-text">
            <strong>PLATED</strong>
            <small>INDIA</small>
          </span>
        </button>

        <nav className="desktop-nav">
          {links.map(([id, label]) => (
            <button
              key={id}
              className={`nav-link ${
                page === id ? "active" : ""
              }`}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="nav-reserve"
          onClick={openReservation}
        >
          Reserve a Table
        </button>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open navigation"
        >
          {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {links.map(([id, label]) => (
            <button
              key={id}
              className={`mobile-link ${
                page === id ? "active" : ""
              }`}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}

          <button
            className="mobile-reserve"
            onClick={() => {
              setMobileOpen(false);
              openReservation();
            }}
          >
            Reserve a Table
          </button>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomePage({
  navigate,
  openLoyalty,
  openReservation,
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-image">
          <img
            src={images.hero}
            alt="Plated India signature dish"
          />
        </div>

        <div className="hero-overlay" />

        <div className="hero-content page-container">
          <div className="hero-kicker">
            CONTEMPORARY INDIAN DINING
          </div>

          <h1>
            Indian flavours.
            <br />
            <em>Beautifully plated.</em>
          </h1>

          <p>
            A modern expression of India's bold flavours,
            warm hospitality and unforgettable dining moments.
          </p>

          <div className="hero-actions">
            <button
              className="button button-light"
              onClick={openReservation}
            >
              Reserve a Table
              <ArrowRight size={17} />
            </button>

            <button
              className="button button-ghost-light"
              onClick={() => navigate("menu")}
            >
              Explore the Menu
            </button>
          </div>
        </div>

        <div className="hero-scroll">
          <ArrowDown size={17} />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="intro section">
        <div className="page-container intro-grid">
          <div className="section-number">01</div>

          <div className="intro-heading">
            <p className="eyebrow">THE PLATED EXPERIENCE</p>

            <h2>
              More than
              <br />
              <em>a meal.</em>
            </h2>
          </div>

          <div className="intro-copy">
            <p className="large-copy">
              Plated India brings the warmth, depth and diversity
              of Indian cuisine into a contemporary dining
              experience.
            </p>

            <p>
              Every plate is created to bring together bold
              flavours, thoughtful presentation and the simple
              pleasure of sharing good food.
            </p>

            <button
              className="text-button"
              onClick={() => navigate("story")}
            >
              Discover our story
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <FeaturedDishes
        navigate={navigate}
        openReservation={openReservation}
      />

      <section className="experience section sage-section">
        <div className="page-container">
          <div className="center-heading">
            <p className="eyebrow">WHY PLATED</p>

            <h2>
              Come hungry.
              <br />
              <em>Leave inspired.</em>
            </h2>
          </div>

          <div className="experience-grid">
            <ExperienceItem
              number="01"
              title="Fresh ingredients"
              text="Thoughtfully selected ingredients come together in every dish."
            />

            <ExperienceItem
              number="02"
              title="Bold flavours"
              text="A celebration of spices, textures and the character of Indian cuisine."
            />

            <ExperienceItem
              number="03"
              title="A modern table"
              text="A relaxed dining experience designed for conversations and memories."
            />
          </div>
        </div>
      </section>

      <section className="story-preview section">
        <div className="page-container story-preview-grid">
          <div className="story-preview-image">
            <img
              src={images.pasta}
              alt="Plated India dining"
            />
          </div>

          <div className="story-preview-content">
            <p className="eyebrow">OUR PHILOSOPHY</p>

            <h2>
              Rooted in India.
              <br />
              <em>Created for today.</em>
            </h2>

            <p>
              Indian cuisine is a story of places, people,
              spices and generations. At Plated, we take
              inspiration from that heritage and give it a
              contemporary point of view.
            </p>

            <button
              className="button button-dark"
              onClick={() => navigate("story")}
            >
              Our Story
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <LoyaltyTeaser
        openLoyalty={openLoyalty}
        navigate={navigate}
      />

      <section className="wheel-teaser section">
        <div className="page-container wheel-teaser-grid">
          <div>
            <p className="eyebrow">A LITTLE SOMETHING EXTRA</p>

            <h2>
              Feeling
              <br />
              <em>lucky?</em>
            </h2>

            <p>
              Spin the Plated Wheel and see what surprise is
              waiting for you.
            </p>

            <button
              className="button button-dark"
              onClick={() => navigate("wheel")}
            >
              Spin the Wheel
              <Sparkles size={17} />
            </button>
          </div>

          <MiniWheel />
        </div>
      </section>

      <Reviews />

      <section className="final-cta">
        <div className="final-cta-overlay" />

        <img
          src={images.creamy}
          alt=""
          className="final-cta-image"
        />

        <div className="final-cta-content">
          <p className="eyebrow">PLATED INDIA</p>

          <h2>
            Your table
            <br />
            <em>is waiting.</em>
          </h2>

          <button
            className="button button-light"
            onClick={openReservation}
          >
            Reserve a Table
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   FEATURED DISHES
========================================================= */

function FeaturedDishes({
  navigate,
  openReservation,
}) {
  const dishes = [
    {
      name: "Signature Chicken",
      description:
        "Tender, fragrant and full of character.",
      image: images.hero,
      number: "01",
    },
    {
      name: "Golden Bowl",
      description:
        "A colourful balance of texture and flavour.",
      image: images.bowl,
      number: "02",
    },
    {
      name: "Creamy Plated",
      description:
        "Comforting, rich and beautifully finished.",
      image: images.creamy,
      number: "03",
    },
  ];

  return (
    <section className="featured section">
      <div className="page-container">
        <div className="section-topline">
          <div>
            <p className="eyebrow">FROM THE KITCHEN</p>

            <h2>
              Made to be
              <br />
              <em>remembered.</em>
            </h2>
          </div>

          <button
            className="text-button"
            onClick={() => navigate("menu")}
          >
            View full menu
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="featured-grid">
          {dishes.map((dish) => (
            <article
              className="dish-feature"
              key={dish.number}
            >
              <div className="dish-feature-image">
                <img
                  src={dish.image}
                  alt={dish.name}
                />

                <span className="dish-number">
                  {dish.number}
                </span>
              </div>

              <div className="dish-feature-info">
                <h3>{dish.name}</h3>

                <p>{dish.description}</p>

                <button
                  className="small-arrow"
                  onClick={openReservation}
                  aria-label={`Reserve ${dish.name}`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function ExperienceItem({ number, title, text }) {
  return (
    <div className="experience-item">
      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   LOYALTY TEASER
========================================================= */

function LoyaltyTeaser({
  openLoyalty,
  navigate,
}) {
  return (
    <section className="loyalty-teaser">
      <div className="page-container loyalty-grid">
        <div className="loyalty-copy">
          <p className="eyebrow">THE PLATED CIRCLE</p>

          <h2>
            Good food.
            <br />
            <em>Better rewards.</em>
          </h2>

          <p>
            Join our circle and enjoy exclusive rewards,
            special surprises and little moments created
            especially for our regulars.
          </p>

          <div className="loyalty-actions">
            <button
              className="button button-dark"
              onClick={openLoyalty}
            >
              Join the Circle
              <Plus size={17} />
            </button>

            <button
              className="text-button light-text-button"
              onClick={() => navigate("loyalty")}
            >
              Learn more
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="loyalty-card">
          <div className="loyalty-card-top">
            <span>PLATED</span>
            <span>CIRCLE</span>
          </div>

          <div className="loyalty-card-icon">
            <Star size={27} />
          </div>

          <div>
            <small>MEMBER BENEFITS</small>

            <h3>
              Your table.
              <br />
              Your rewards.
            </h3>
          </div>

          <div className="loyalty-benefits">
            <span>
              <Check size={14} />
              Earn points
            </span>

            <span>
              <Check size={14} />
              Birthday surprises
            </span>

            <span>
              <Check size={14} />
              Exclusive offers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function Reviews() {
  const reviews = [
    {
      text: "The flavours were incredible and the entire experience felt so thoughtfully designed.",
      name: "A happy guest",
    },
    {
      text: "Beautiful food, warm service and a completely different take on Indian dining.",
      name: "Restaurant guest",
    },
    {
      text: "One of those restaurants you immediately want to come back to.",
      name: "Local guest",
    },
  ];

  return (
    <section className="reviews section">
      <div className="page-container">
        <div className="center-heading">
          <p className="eyebrow">FROM OUR TABLE</p>

          <h2>
            Words from
            <br />
            <em>our guests.</em>
          </h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article
              className="review"
              key={index}
            >
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p>“{review.text}”</p>

              <span>{review.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MENU PAGE
========================================================= */

function MenuPage({
  openReservation,
}) {
  const [activeCategory, setActiveCategory] =
    useState("starters");

  const active = useMemo(
    () =>
      menuCategories.find(
        (category) => category.id === activeCategory
      ),
    [activeCategory]
  );

  return (
    <>
      <PageHero
        eyebrow="THE MENU"
        title={
          <>
            Tradition,
            <br />
            <em>reimagined.</em>
          </>
        }
        image={images.bowl}
      />

      <section className="menu-page section">
        <div className="page-container">
          <div className="menu-intro">
            <p>
              A collection of contemporary Indian dishes
              designed around bold flavour, beautiful
              ingredients and the pleasure of sharing.
            </p>
          </div>

          <div className="menu-tabs">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={
                  activeCategory === category.id
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(category.id)
                }
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="menu-items">
            {active?.items.map((item, index) => (
              <MenuItem
                key={`${item.name}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>

          <div className="menu-note">
            <Utensils size={19} />

            <p>
              Please let our team know about any allergies or
              dietary requirements when ordering.
            </p>
          </div>
        </div>
      </section>

      <section className="menu-bottom-cta sage-section">
        <div className="page-container">
          <p className="eyebrow">READY FOR DINNER?</p>

          <h2>
            Save a seat
            <br />
            <em>at the table.</em>
          </h2>

          <button
            className="button button-dark"
            onClick={openReservation}
          >
            Reserve a Table
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   MENU ITEM
========================================================= */

function MenuItem({ item, index }) {
  return (
    <article className="menu-item">
      <div className="menu-item-image">
        <img
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="menu-item-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="menu-item-content">
        <div>
          <div className="menu-item-title">
            <h3>{item.name}</h3>

            {item.tags.map((tag) => (
              <span
                className="menu-tag"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          <p>{item.description}</p>
        </div>

        <strong>{item.price}</strong>
      </div>
    </article>
  );
}

/* =========================================================
   STORY PAGE
========================================================= */

function StoryPage({
  navigate,
  openReservation,
}) {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title={
          <>
            India,
            <br />
            <em>through a modern lens.</em>
          </>
        }
        image={images.pasta}
      />

      <section className="story-main section">
        <div className="page-container story-main-grid">
          <div>
            <p className="eyebrow">THE IDEA</p>

            <h2>
              A table inspired
              <br />
              <em>by India.</em>
            </h2>
          </div>

          <div>
            <p className="large-copy">
              Indian cuisine is deeply rooted in culture,
              history and the simple joy of gathering around
              a table.
            </p>

            <p>
              Plated India takes inspiration from that richness
              while creating a dining experience that feels
              contemporary, relaxed and personal.
            </p>

            <p>
              Our philosophy is simple: respect the ingredients,
              celebrate flavour and make every guest feel
              welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="story-image-break">
        <img
          src={images.hero}
          alt="Plated India food"
        />

        <div className="story-quote">
          <span>“</span>

          <p>
            Food is not just what we serve.
            <br />
            It is how we bring people together.
          </p>
        </div>
      </section>

      <section className="story-values section">
        <div className="page-container">
          <div className="center-heading">
            <p className="eyebrow">WHAT WE BELIEVE</p>

            <h2>
              Simple ideas.
              <br />
              <em>Beautifully executed.</em>
            </h2>
          </div>

          <div className="values-grid">
            <Value
              number="01"
              title="Respect the ingredient"
              text="Good food begins with ingredients that deserve attention."
            />

            <Value
              number="02"
              title="Celebrate flavour"
              text="Spices should create harmony, depth and a reason to take another bite."
            />

            <Value
              number="03"
              title="Make people feel welcome"
              text="The best meals are remembered because of how they made you feel."
            />
          </div>
        </div>
      </section>

      <section className="story-final sage-section">
        <div className="page-container story-final-grid">
          <img
            src={images.creamy}
            alt="Plated India dish"
          />

          <div>
            <p className="eyebrow">COME EXPERIENCE IT</p>

            <h2>
              Your next
              <br />
              <em>favourite table.</em>
            </h2>

            <button
              className="button button-dark"
              onClick={openReservation}
            >
              Reserve a Table
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Value({
  number,
  title,
  text,
}) {
  return (
    <article className="value">
      <span>{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

/* =========================================================
   LOYALTY PAGE
========================================================= */

function LoyaltyPage({
  openLoyalty,
  navigate,
}) {
  return (
    <>
      <PageHero
        eyebrow="THE PLATED CIRCLE"
        title={
          <>
            Good food.
            <br />
            <em>Better rewards.</em>
          </>
        }
        image={images.hero}
      />

      <section className="loyalty-page section">
        <div className="page-container">
          <div className="loyalty-page-intro">
            <p className="eyebrow">WELCOME TO THE CIRCLE</p>

            <h2>
              The more you visit,
              <br />
              <em>the more we give back.</em>
            </h2>

            <p>
              The Plated Circle is our way of saying thank you
              for making us part of your table.
            </p>

            <button
              className="button button-dark"
              onClick={openLoyalty}
            >
              Join the Circle
              <Plus size={17} />
            </button>
          </div>

          <div className="loyalty-benefit-grid">
            <LoyaltyBenefit
              icon={<Trophy />}
              title="Earn points"
              text="Collect points whenever you dine with us."
            />

            <LoyaltyBenefit
              icon={<Star />}
              title="Birthday surprises"
              text="A little something special on your birthday."
            />

            <LoyaltyBenefit
              icon={<Sparkles />}
              title="Exclusive offers"
              text="Enjoy selected offers created for members."
            />

            <LoyaltyBenefit
              icon={<Utensils />}
              title="Special events"
              text="Get early access to selected dining experiences."
            />
          </div>
        </div>
      </section>

      <section className="loyalty-dashboard sage-section">
        <div className="page-container">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">
                MEMBER PREVIEW
              </p>

              <h2>
                Your Plated
                <br />
                <em>Circle.</em>
              </h2>
            </div>

            <span className="member-badge">
              MEMBER
            </span>
          </div>

          <div className="dashboard-grid">
            <div className="points-card">
              <small>CURRENT POINTS</small>

              <strong>0</strong>

              <p>
                Start earning with your next visit.
              </p>
            </div>

            <div className="reward-card">
              <small>NEXT REWARD</small>

              <h3>
                Complimentary Dessert
              </h3>

              <div className="progress">
                <span />
              </div>

              <p>
                0 / 500 points
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wheel-callout section">
        <div className="page-container wheel-callout-grid">
          <div className="mini-wheel-large">
            <MiniWheel />
          </div>

          <div>
            <p className="eyebrow">
              MEMBER PERK
            </p>

            <h2>
              Feeling
              <br />
              <em>lucky?</em>
            </h2>

            <p>
              Members can try their luck with the Plated Wheel
              and unlock a little extra for their next visit.
            </p>

            <button
              className="button button-dark"
              onClick={() => navigate("wheel")}
            >
              Spin the Wheel
              <Sparkles size={17} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function LoyaltyBenefit({
  icon,
  title,
  text,
}) {
  return (
    <article className="loyalty-benefit">
      <div className="benefit-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

/* =========================================================
   WHEEL PAGE
========================================================= */

function WheelPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(
      Math.random() * wheelPrizes.length
    );

    const segmentAngle =
      360 / wheelPrizes.length;

    const target =
      360 * 5 +
      (360 -
        randomIndex * segmentAngle -
        segmentAngle / 2);

    setRotation((current) => current + target);

    setTimeout(() => {
      setResult(wheelPrizes[randomIndex]);
      setSpinning(false);
    }, 4300);
  };

  return (
    <>
      <PageHero
        eyebrow="THE PLATED WHEEL"
        title={
          <>
            Spin for a
            <br />
            <em>little something extra.</em>
          </>
        }
        image={images.creamy}
      />

      <section className="wheel-page section">
        <div className="page-container wheel-page-grid">
          <div className="wheel-copy">
            <p className="eyebrow">
              YOUR LUCKY MOMENT
            </p>

            <h2>
              What will
              <br />
              <em>you get?</em>
            </h2>

            <p>
              Give the wheel a spin and discover your Plated
              surprise.
            </p>

            <button
              className="button button-dark"
              onClick={spin}
              disabled={spinning}
            >
              {spinning ? "Spinning..." : "Spin the Wheel"}
              <Sparkles size={17} />
            </button>

            {result && (
              <div className="wheel-result">
                <span>
                  {result.code ? "YOU WON" : "NEXT TIME"}
                </span>

                <strong>{result.label}</strong>

                {result.code && (
                  <div className="coupon">
                    {result.code}
                  </div>
                )}

                <p>
                  {result.code
                    ? "Show this code to our team when you visit."
                    : "The table is still waiting for you."}
                </p>
              </div>
            )}
          </div>

          <div className="wheel-stage">
            <Wheel
              rotation={rotation}
              spinning={spinning}
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   WHEEL
========================================================= */

function Wheel({
  rotation,
  spinning,
}) {
  const segmentColors = [
    "#a8b5a2",
    "#26382f",
    "#e9e2d5",
    "#7f927d",
    "#d5cdbd",
    "#344b40",
  ];

  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer">
        ▼
      </div>

      <div
        className={`wheel ${
          spinning ? "is-spinning" : ""
        }`}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {wheelPrizes.map((prize, index) => {
          const angle =
            index * (360 / wheelPrizes.length);

          return (
            <div
              key={prize.label}
              className="wheel-segment"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <span
                style={{
                  backgroundColor:
                    segmentColors[index],
                }}
              >
                {prize.label}
              </span>
            </div>
          );
        })}

        <div className="wheel-center">
          <span>PLATED</span>
          <small>SPIN</small>
        </div>
      </div>
    </div>
  );
}

function MiniWheel() {
  return (
    <div className="mini-wheel">
      <div className="mini-wheel-inner">
        <span>SPIN</span>
        <small>PLATED</small>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactPage({
  openReservation,
}) {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={
          <>
            Come
            <br />
            <em>find us.</em>
          </>
        }
        image={images.bowl}
      />

      <section className="contact-page section">
        <div className="page-container">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="eyebrow">
                PLATED INDIA
              </p>

              <h2>
                Let's make
                <br />
                <em>dinner happen.</em>
              </h2>

              <div className="contact-details">
                <ContactDetail
                  icon={<MapPin />}
                  label="Address"
                  value="Panchsheel Park, New Delhi"
                />

                <ContactDetail
                  icon={<Phone />}
                  label="Phone"
                  value="+91 00000 00000"
                />

                <ContactDetail
                  icon={<Mail />}
                  label="Email"
                  value="hello@platedindia.com"
                />

                <ContactDetail
                  icon={<Clock3 />}
                  label="Opening hours"
                  value="Mon–Sun · 12:00–23:00"
                />
              </div>
            </div>

            <ReservationForm
              openReservation={openReservation}
            />
          </div>
        </div>
      </section>

      <section className="map-placeholder">
        <div>
          <MapPin size={27} />

          <h3>Find your way to Plated.</h3>

          <p>
            Interactive map can be connected here once the
            final restaurant address is confirmed.
          </p>
        </div>
      </section>
    </>
  );
}

function ContactDetail({
  icon,
  label,
  value,
}) {
  return (
    <div className="contact-detail">
      <div>{icon}</div>

      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   RESERVATION FORM
========================================================= */

function ReservationForm({
  openReservation,
}) {
  const [submitted, setSubmitted] =
    useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="reservation-success">
        <div className="success-icon">
          <Check size={30} />
        </div>

        <p className="eyebrow">
          REQUEST RECEIVED
        </p>

        <h3>
          Thank you.
          <br />
          <em>We'll be in touch.</em>
        </h3>

        <p>
          Your reservation request has been received.
          Replace this demo action with your real booking
          system when ready.
        </p>

        <button
          className="button button-dark"
          onClick={() => setSubmitted(false)}
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="reservation-form"
      onSubmit={submit}
    >
      <div className="form-heading">
        <p className="eyebrow">
          RESERVATIONS
        </p>

        <h3>
          Reserve
          <br />
          <em>your table.</em>
        </h3>
      </div>

      <div className="form-grid">
        <Field
          label="Name"
          placeholder="Your name"
          required
        />

        <Field
          label="Email"
          type="email"
          placeholder="you@email.com"
          required
        />

        <Field
          label="Phone"
          placeholder="+91 ..."
        />

        <Field
          label="Guests"
          type="number"
          min="1"
          max="20"
          placeholder="2"
          required
        />

        <Field
          label="Date"
          type="date"
          required
        />

        <Field
          label="Time"
          type="time"
          required
        />
      </div>

      <label className="field full-field">
        <span>Special request</span>

        <textarea
          placeholder="Anything we should know?"
          rows="4"
        />
      </label>

      <button
        className="button button-dark form-submit"
        type="submit"
      >
        Request Reservation
        <ArrowRight size={17} />
      </button>

      <p className="form-note">
        This form is currently a front-end demo and can
        later be connected to the restaurant's booking system.
      </p>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required = false,
  min,
  max,
}) {
  return (
    <label className="field">
      <span>{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
      />
    </label>
  );
}

/* =========================================================
   PAGE HERO
========================================================= */

function PageHero({
  eyebrow,
  title,
  image,
}) {
  return (
    <section className="page-hero">
      <img
        src={image}
        alt=""
      />

      <div className="page-hero-overlay" />

      <div className="page-container page-hero-content">
        <p className="eyebrow">{eyebrow}</p>

        <h1>{title}</h1>
      </div>
    </section>
  );
}

/* =========================================================
   MODALS
========================================================= */

function LoyaltyModal({
  close,
}) {
  const [joined, setJoined] =
    useState(false);

  const submit = (event) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={close}
    >
      <div
        className="modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={close}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!joined ? (
          <>
            <p className="eyebrow">
              THE PLATED CIRCLE
            </p>

            <h2>
              Welcome to
              <br />
              <em>the circle.</em>
            </h2>

            <p>
              Join our loyalty circle for rewards,
              surprises and special moments.
            </p>

            <form
              className="modal-form"
              onSubmit={submit}
            >
              <Field
                label="First name"
                placeholder="Your first name"
                required
              />

              <Field
                label="Last name"
                placeholder="Your last name"
              />

              <Field
                label="Email"
                type="email"
                placeholder="you@email.com"
                required
              />

              <Field
                label="Birthday"
                type="date"
              />

              <button
                className="button button-dark"
                type="submit"
              >
                Join the Circle
                <Plus size={17} />
              </button>
            </form>
          </>
        ) : (
          <div className="joined-state">
            <div className="success-icon">
              <Check size={30} />
            </div>

            <p className="eyebrow">
              WELCOME TO THE CIRCLE
            </p>

            <h2>
              You're in.
              <br />
              <em>Welcome.</em>
            </h2>

            <p>
              Your Plated Circle membership has been
              created in this demo.
            </p>

            <button
              className="button button-dark"
              onClick={close}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReservationModal({
  close,
}) {
  const [submitted, setSubmitted] =
    useState(false);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={close}
    >
      <div
        className="modal reservation-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={close}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <p className="eyebrow">
              RESERVATIONS
            </p>

            <h2>
              Save a seat
              <br />
              <em>at the table.</em>
            </h2>

            <form
              className="modal-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <Field
                label="Name"
                placeholder="Your name"
                required
              />

              <Field
                label="Email"
                type="email"
                placeholder="you@email.com"
                required
              />

              <div className="form-grid">
                <Field
                  label="Date"
                  type="date"
                  required
                />

                <Field
                  label="Time"
                  type="time"
                  required
                />
              </div>

              <Field
                label="Guests"
                type="number"
                min="1"
                max="20"
                placeholder="2"
                required
              />

              <button
                className="button button-dark"
                type="submit"
              >
                Request Reservation
                <ArrowRight size={17} />
              </button>
            </form>
          </>
        ) : (
          <div className="joined-state">
            <div className="success-icon">
              <Check size={30} />
            </div>

            <p className="eyebrow">
              REQUEST RECEIVED
            </p>

            <h2>
              Thank you.
              <br />
              <em>We'll be in touch.</em>
            </h2>

            <p>
              This is currently a demo reservation form.
              Connect it to the restaurant's booking system
              before launch.
            </p>

            <button
              className="button button-dark"
              onClick={close}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({
  navigate,
}) {
  return (
    <footer className="footer">
      <div className="page-container">
        <div className="footer-top">
          <div className="footer-brand">
            <button
              className="brand footer-logo"
              onClick={() => navigate("home")}
            >
              <span className="brand-mark">
                P
              </span>

              <span className="brand-text">
                <strong>PLATED</strong>
                <small>INDIA</small>
              </span>
            </button>

            <p>
              Modern Indian dining.
              <br />
              Beautifully plated.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <span>Explore</span>

              <button
                onClick={() => navigate("menu")}
              >
                Menu
              </button>

              <button
                onClick={() => navigate("story")}
              >
                Our Story
              </button>

              <button
                onClick={() => navigate("loyalty")}
              >
                Plated Circle
              </button>

              <button
                onClick={() => navigate("wheel")}
              >
                Spin the Wheel
              </button>
            </div>

            <div>
              <span>Visit</span>

              <button
                onClick={() => navigate("contact")}
              >
                Contact
              </button>

              <button
                onClick={() => navigate("contact")}
              >
                Reservations
              </button>

              <a href="mailto:hello@platedindia.com">
                Email us
              </a>

              <a href="tel:+910000000000">
                Call us
              </a>
            </div>

            <div>
              <span>Follow</span>

              <a
                href="#"
                onClick={(event) =>
                  event.preventDefault()
                }
              >
                Instagram
              </a>

              <a
                href="#"
                onClick={(event) =>
                  event.preventDefault()
                }
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Plated India. All rights reserved.
          </span>

          <span>
            Privacy · Terms
          </span>
        </div>
      </div>
    </footer>
  );
}
