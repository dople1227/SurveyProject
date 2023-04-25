MY_SECRET = {"SECRET_KEY": "django-insecure-!5)#(f^z^p&z%6zz4649l8au7k8eb31lc-c_6j^cu*slzzs%wu"}

MY_DATABASES = {
    "default": {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': BASE_DIR / 'db.sqlite3',
        "ENGINE": "django.db.backends.mysql",
        "NAME": "djangodb",
        "USER": "AlohaAdmin",
        "PASSWORD": "aloha123!@#",
        "HOST": "localhost",
        "PORT": "3306",
    }
}
