from utils.password_utils import hash_password, verify_password

input_password = input("Enter password to hash: ")
print("Hashed Password:", hash_password(input_password))