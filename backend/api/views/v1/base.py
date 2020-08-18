import datetime
from decimal import Decimal
from enum import Enum

import simplejson as json
from flask import Response, request

from api.constant import SysStatus, MessageCategory


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, datetime.date):
            return obj.strftime('%Y-%m-%d')
        elif isinstance(obj, Enum):
            return obj.name
        elif isinstance(obj, Decimal):
            return str(obj.quantize(Decimal('0.00')))
        return json.JSONEncoder.default(self, obj)


def handler(sys_status, data, message):
    """
    返回响应
    :param sys_status:返回状态类型
    :param data:数据
    :param message:提示信息
    :return:返回响应
    """
    if isinstance(message, MessageCategory):
        message = message.name
    elif message is None and sys_status in [SysStatus.FAILURE, SysStatus.PARAMETER_CHECK_ERROR]:
        print("***ERROR REQUEST {} {}***".format(request.path, request.method))
    response = {'sys_status': sys_status.name, 'data': data, "message": message}
    response = json.dumps(response, ensure_ascii=False, use_decimal=False, cls=JsonEncoder)
    return Response(response, mimetype='application/json')


def success_handler(data=None):
    """
    返回响应
    :param data:数据
    :return:返回响应
    """
    return handler(SysStatus.SUCCESS, data, None)


def failure_handler(message):
    """
    返回响应
    :param message:错误原因
    :return:返回响应
    """
    return handler(SysStatus.FAILURE, None, message)
