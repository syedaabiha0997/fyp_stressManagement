from dataset.health_dataset import HEALTH_DATASET

def find_dataset_answer(user_message):
    user_message = user_message.lower().strip()

    for question, answer in HEALTH_DATASET.items():
        if question in user_message:
            return answer

    return None
