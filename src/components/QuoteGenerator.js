import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';

// Quotes organized by mood
const quotes = {
  happy: [
    { text: "Happiness is not by chance, but by choice!", author: "Jim Rohn", emoji: "😊" },
    { text: "Wake up with determination. Go to bed with satisfaction!", author: "Unknown", emoji: "☀️" },
    { text: "Life is short. Smile while you still have teeth!", author: "Unknown", emoji: "😁" },
    { text: "Every day may not be good, but there's something good in every day!", author: "Alice Morse Earle", emoji: "🌈" },
    { text: "Happiness is a warm puppy!", author: "Charles M. Schulz", emoji: "🐶" },
    { text: "The best way to cheer yourself up is to try to cheer somebody else up!", author: "Mark Twain", emoji: "🎉" },
    { text: "Be happy for this moment. This moment is your life!", author: "Omar Khayyam", emoji: "✨" },
    { text: "Happiness is when what you think, what you say, and what you do are in harmony!", author: "Mahatma Gandhi", emoji: "🌟" }
  ],
  sad: [
    { text: "Every storm runs out of rain. Keep going!", author: "Maya Angelou", emoji: "🌧️" },
    { text: "It's okay to not be okay. Tomorrow is a new day!", author: "Unknown", emoji: "💙" },
    { text: "The darkest nights produce the brightest stars!", author: "Unknown", emoji: "⭐" },
    { text: "Sometimes you need to be alone to reflect on life. Take all the time you need!", author: "Unknown", emoji: "🌙" },
    { text: "Tears are words that need to be written!", author: "Paulo Coelho", emoji: "💧" },
    { text: "You are allowed to feel messed up and inside out. It doesn't mean you're defective!", author: "David Mitchell", emoji: "🌊" },
    { text: "Sadness flies away on the wings of time!", author: "Jean de La Fontaine", emoji: "🕊️" },
    { text: "Behind every sweet smile, there is a bitter sadness that no one can see!", author: "Tupac Shakur", emoji: "😔" }
  ],
  adventurous: [
    { text: "The question isn't who is going to let me; it's who is going to stop me!", author: "Ayn Rand", emoji: "🚀" },
    { text: "Adventure is worthwhile in itself!", author: "Amelia Earhart", emoji: "✈️" },
    { text: "Life is either a daring adventure or nothing at all!", author: "Helen Keller", emoji: "🏔️" },
    { text: "The biggest adventure you can take is to live the life of your dreams!", author: "Oprah Winfrey", emoji: "🌍" },
    { text: "Don't wait for opportunity. Create it. Own it. Dominate it!", author: "Unknown", emoji: "⚡" },
    { text: "Great things never come from comfort zones. Step out and conquer!", author: "Unknown", emoji: "🎯" },
    { text: "The best view comes after the hardest climb. Keep climbing!", author: "Unknown", emoji: "⛰️" },
    { text: "Jobs fill your pocket, but adventures fill your soul!", author: "Jamie Lyn Beatty", emoji: "🗺️" }
  ],
  scary: [
    { text: "Fear is only as deep as the mind allows!", author: "Japanese Proverb", emoji: "👻" },
    { text: "The only thing we have to fear is fear itself!", author: "Franklin D. Roosevelt", emoji: "😱" },
    { text: "Courage is not the absence of fear, but the triumph over it!", author: "Nelson Mandela", emoji: "🦇" },
    { text: "Everything you've ever wanted is on the other side of fear!", author: "George Addair", emoji: "🌑" },
    { text: "Do one thing every day that scares you!", author: "Eleanor Roosevelt", emoji: "🕷️" },
    { text: "Fear is a reaction. Courage is a decision!", author: "Winston Churchill", emoji: "💀" },
    { text: "The cave you fear to enter holds the treasure you seek!", author: "Joseph Campbell", emoji: "🏚️" },
    { text: "Face your fears or they will climb over your back!", author: "Frank Herbert", emoji: "🎃" }
  ],
  funny: [
    { text: "I'm not lazy, I'm just on energy-saving mode!", author: "Unknown", emoji: "😴" },
    { text: "Why did the scarecrow win an award? Because he was outstanding in his field!", author: "Unknown", emoji: "😂" },
    { text: "I told my wife she was drawing her eyebrows too high. She looked surprised!", author: "Unknown", emoji: "🤣" },
    { text: "Common sense is like deodorant. The people who need it most never use it!", author: "Unknown", emoji: "😆" },
    { text: "I'm not arguing, I'm just explaining why I'm right!", author: "Unknown", emoji: "🤷" },
    { text: "My bed is a magical place where I suddenly remember everything I forgot to do!", author: "Unknown", emoji: "🛏️" },
    { text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning!", author: "Unknown", emoji: "💇" },
    { text: "I'm on a seafood diet. I see food and I eat it!", author: "Unknown", emoji: "🍕" }
  ],
  thoughtful: [
    { text: "The only way to do great work is to love what you do!", author: "Steve Jobs", emoji: "💡" },
    { text: "Life is what happens when you're busy making other plans!", author: "John Lennon", emoji: "🌈" },
    { text: "Do something today that your future self will thank you for!", author: "Sean Patrick Flanery", emoji: "🎁" },
    { text: "The key to success is to focus on goals, not obstacles!", author: "Unknown", emoji: "🔑" },
    { text: "You are stronger than you think. Braver than you believe. More talented than you know!", author: "Unknown", emoji: "🌸" },
    { text: "Be fearless in the pursuit of what sets your soul on FIRE!", author: "Unknown", emoji: "🔥" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now!", author: "Chinese Proverb", emoji: "🌳" },
    { text: "Life is 10% what happens to you and 90% how you react to it!", author: "Charles R. Swindoll", emoji: "🎭" }
  ]
};

// Mood configurations with colors and emojis
const moods = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    color: '#ff9a56'
  },
  sad: {
    name: 'Sad',
    emoji: '😢',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea'
  },
  adventurous: {
    name: 'Adventurous',
    emoji: '🚀',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe'
  },
  scary: {
    name: 'Scary',
    emoji: '😱',
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    color: '#ff6b6b'
  },
  funny: {
    name: 'Funny',
    emoji: '😂',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb'
  },
  thoughtful: {
    name: 'Thoughtful',
    emoji: '🤔',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    color: '#a8edea'
  }
};

function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [copied, setCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedMood, setSelectedMood] = useState('happy');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Get a random quote from selected mood
  const getRandomQuote = (mood) => {
    const moodQuotes = quotes[mood];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    return { ...moodQuotes[randomIndex], mood };
  };

  // Load initial quote
  useEffect(() => {
    const quote = getRandomQuote(selectedMood);
    setCurrentQuote(quote);
    setFadeIn(true);
    setQuoteIndex(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle mood change
  const handleMoodChange = (mood) => {
    setFadeIn(false);
    setSelectedMood(mood);
    setTimeout(() => {
      const quote = getRandomQuote(mood);
      setCurrentQuote(quote);
      setFadeIn(true);
      setQuoteIndex(1);
    }, 300);
  };

  // Handle new quote button click
  const handleNewQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      const quote = getRandomQuote(selectedMood);
      setCurrentQuote(quote);
      setFadeIn(true);
      setQuoteIndex(prev => (prev % quotes[selectedMood].length) + 1);
    }, 300);
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = async () => {
    if (currentQuote) {
      try {
        await navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const isFavorited = favorites.some(fav => `${fav.text}-${fav.author}` === quoteId);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter(fav => `${fav.text}-${fav.author}` !== quoteId);
    } else {
      newFavorites = [...favorites, currentQuote];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  // Check if current quote is favorited
  const isFavorited = () => {
    if (!currentQuote) return false;
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    return favorites.some(fav => `${fav.text}-${fav.author}` === quoteId);
  };

  // Remove from favorites
  const removeFavorite = (quote) => {
    const quoteId = `${quote.text}-${quote.author}`;
    const newFavorites = favorites.filter(fav => `${fav.text}-${fav.author}` !== quoteId);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  if (!currentQuote) {
    return <div>Loading...</div>;
  }

  const currentMood = moods[selectedMood];
  const totalQuotesInMood = quotes[selectedMood].length;

  return (
    <div className="quote-container" style={{ background: currentMood.background }}>
      <div className="quote-card">
        <div className="header">
          <h1 className="app-title">✨ Mood Quote Generator ✨</h1>
          <div className="quote-counter">
            Quote #{quoteIndex} of {totalQuotesInMood}
          </div>
        </div>

        {/* Mood Selection Buttons */}
        <div className="mood-selector">
          <h3 className="mood-title">How are you feeling?</h3>
          <div className="mood-buttons">
            {Object.keys(moods).map((moodKey) => (
              <button
                key={moodKey}
                className={`mood-btn ${selectedMood === moodKey ? 'active' : ''}`}
                onClick={() => handleMoodChange(moodKey)}
                style={{
                  borderColor: selectedMood === moodKey ? moods[moodKey].color : 'transparent'
                }}
              >
                <span className="mood-emoji">{moods[moodKey].emoji}</span>
                <span className="mood-name">{moods[moodKey].name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className={`quote-content ${fadeIn ? 'fade-in' : 'fade-out'}`}>
          <div className="emoji-icon">{currentQuote.emoji}</div>
          <div className="category-badge" style={{ background: currentMood.color }}>
            {currentMood.name}
          </div>
          <p className="quote-text">{currentQuote.text}</p>
          <p className="quote-author">— {currentQuote.author}</p>
        </div>

        <div className="button-container">
          <button className="btn btn-primary" onClick={handleNewQuote}>
            <span className="btn-emoji">🎲</span>
            Inspire Me!
          </button>
          
          <button 
            className={`btn btn-favorite ${isFavorited() ? 'favorited' : ''}`} 
            onClick={handleToggleFavorite}
          >
            <span className="btn-emoji">{isFavorited() ? '❤️' : '🤍'}</span>
            {isFavorited() ? 'Favorited' : 'Favorite'}
          </button>
          
          <button className="btn btn-secondary" onClick={handleCopyToClipboard}>
            <span className="btn-emoji">📋</span>
            {copied ? 'Copied!' : 'Copy Quote'}
          </button>
        </div>

        <button 
          className="btn btn-favorites-toggle" 
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <span className="btn-emoji">⭐</span>
          {showFavorites ? 'Hide' : 'View'} Favorites ({favorites.length})
        </button>

        {copied && (
          <div className="copy-notification">
            ✓ Quote copied to clipboard!
          </div>
        )}

        {showFavorites && (
          <div className="favorites-section">
            <h2 className="favorites-title">💖 Your Favorite Quotes</h2>
            {favorites.length === 0 ? (
              <p className="no-favorites">No favorites yet! Click the heart to save quotes.</p>
            ) : (
              <div className="favorites-list">
                {favorites.map((quote, index) => (
                  <div key={index} className="favorite-item">
                    <div className="favorite-emoji">{quote.emoji}</div>
                    <div className="favorite-content">
                      <p className="favorite-text">"{quote.text}"</p>
                      <p className="favorite-author">— {quote.author}</p>
                      {quote.mood && (
                        <span className="favorite-mood">Mood: {moods[quote.mood]?.name || 'Unknown'}</span>
                      )}
                    </div>
                    <button 
                      className="remove-favorite"
                      onClick={() => removeFavorite(quote)}
                      title="Remove from favorites"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteGenerator;
