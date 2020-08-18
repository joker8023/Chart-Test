from enum import Enum, unique

# VNHK
from common.config import CONFIG

VNHK_HOST = CONFIG.get_cfg("VNHK", "HOST")
VNHK_PORT = CONFIG.get_cfg("VNHK", "PORT")
VNHK_USER = CONFIG.get_cfg("VNHK", "USER")
VNHK_PASSWORD = CONFIG.get_cfg("VNHK", "PASSWORD")
VNHK_DATABASE = CONFIG.get_cfg("VNHK", "DATABASE")


# 返回状态类型
@unique
class SysStatus(Enum):
    SYSTEM_ERROR = "系统错误，请稍后再试"
    SUCCESS = "成功"
    FAILURE = "失败"
    PARAMETER_CHECK_ERROR = "参数校验错误"


@unique
class MessageCategory(Enum):
    BAD_REQUEST = "错误请求"
    NOT_FONUND = "请求不存在"
    METHOD_NOT_ALLOWED = "请求方法不允许"


Array_Length = 1
