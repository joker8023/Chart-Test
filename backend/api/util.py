from random import uniform


def gen_random():
    """
    生成随便两位小数数字
    :return:
    """
    return round(uniform(10000, 100000), 2)
