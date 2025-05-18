from flask import Flask, request, jsonify # type: ignore
import random
import re

app = Flask(__name__)

# Simple keywords to emotion mapping
emotion_keywords = {
    'sad': ['sad', 'unhappy', 'depressed', 'cry', 'lonely'],
    'happy': ['happy', 'joy', 'excited', 'great', 'good'],
    'angry': ['angry', 'mad', 'furious', 'rage'],
    'stressed': ['stress', 'tired', 'burnout', 'exhausted'],
    'anxious': ['anxious', 'worried', 'scared', 'fear'],
}

# Health tips based on emotions
emotion_suggestions = {
    'sad': [
        "It's okay to feel sad. Try talking to a friend or journaling your thoughts.",
        "Go for a short walk outside and breathe in some fresh air.",
        "Maybe watch your favorite movie or listen to uplifting music."
    ],
    'happy': [
        "That's wonderful! Keep doing what makes you happy.",
        "Share your joy with others, it doubles the happiness!",
        "How about celebrating with a small dance or treat?"
    ],
    'angry': [
        "Try deep breathing: inhale for 4 seconds, hold for 7, exhale for 8.",
        "Take a break, splash cold water on your face, and relax.",
        "Channel your anger into a physical workout like punching a pillow or doing pushups!"
    ],
    'stressed': [
        "Take a 5-minute meditation break. You deserve it!",
        "Try to prioritize your tasks and tackle them one at a time.",
        "Remember to hydrate and take short walks."
    ],
    'anxious': [
        "Ground yourself: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
        "Write down what's worrying you and plan small actions.",
        "Try some light stretching or yoga."
    ],
    'default': [
        "I'm here for you! Tell me more.",
        "How are you feeling right now?",
        "Remember: your mental and physical health matters. ❤"
    ]
}

# Detect emotion in user input
def detect_emotion(user_input):
    user_input = user_input.lower()
    for emotion, keywords in emotion_keywords.items():
        if any(keyword in user_input for keyword in keywords):
            return emotion
    return 'default'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    print(f"Received message: {user_message}")

    food_items = [
        'pizza', 'burger', 'pasta', 'sushi', 'salad', 
        'ice cream', 'sandwich', 'fries', 'steak'
    ]

    lower_message = user_message.lower()
    # Normalize hyphens to spaces for better matching (e.g., "ice-cream" -> "ice cream")
    normalized_message = lower_message.replace('-', ' ')
    print(f"Normalized message: {normalized_message}")

    detected_food = []
    for food in food_items:
        # Use regex word boundaries to avoid partial matches
        pattern = r'\b' + re.escape(food) + r'\b'
        if re.search(pattern, normalized_message):
            detected_food.append(food)

    print(f"Detected food items: {detected_food}")

    if detected_food:
        food_list = ', '.join(detected_food)
        return jsonify({
            'response': f"Yum! I see you're thinking about: {food_list}. "
                        "I can't bring food, but I'm here for emotional support too!"
        })

    # If no food detected, check emotion
    emotion = detect_emotion(user_message)
    suggestions = emotion_suggestions.get(emotion, emotion_suggestions['default'])
    bot_response = random.choice(suggestions)

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
