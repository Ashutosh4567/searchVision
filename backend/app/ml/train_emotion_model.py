import tensorflow as tf
from tensorflow.keras import layers, models

IMG_SIZE = 48
BATCH_SIZE = 64
EPOCHS = 15

# -----------------------
# LOAD DATASETS (NO LABEL MAPPING)
# -----------------------
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    "train",
    image_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=BATCH_SIZE,
    shuffle=True
)

test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    "test",
    image_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=BATCH_SIZE,
    shuffle=False
)

print("Class order:", train_ds.class_names)

# Normalize images ONLY
def normalize(image, label):
    image = tf.cast(image, tf.float32) / 255.0
    return image, label

train_ds = train_ds.map(normalize)
test_ds = test_ds.map(normalize)

# -----------------------
# MODEL (7-class emotion model)
# -----------------------
model = models.Sequential([
    layers.Input(shape=(48, 48, 1)),

    layers.Conv2D(32, 3, activation="relu"),
    layers.MaxPooling2D(),

    layers.Conv2D(64, 3, activation="relu"),
    layers.MaxPooling2D(),

    layers.Flatten(),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.5),

    layers.Dense(7, activation="softmax")  # 7 emotions
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# -----------------------
# TRAIN
# -----------------------
model.fit(
    train_ds,
    validation_data=test_ds,
    epochs=EPOCHS
)

# -----------------------
# SAVE MODEL
# -----------------------
model.save("emotion_model.h5")
print("✅ Emotion model saved successfully")
