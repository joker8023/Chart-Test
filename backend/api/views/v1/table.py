import time

from flask import Blueprint, request

from api.constant import Array_Length
from api.extensions import db
from api.models.table import Table1, Table2
from api.schemas.table import table_name_schema, table_data_schema
from api.util import gen_random
from api.views.v1.base import success_handler

blueprint = Blueprint('table', __name__, url_prefix='/api/v1/table')


@blueprint.route('', methods=['GET'])
def get_data(**kwargs):
    """
    @api {GET} /api/v1/table 获取表数据
    @apiName gen_data
    @apiGroup Table
    @apiParam {String} table 表名
    @apiSuccess {number} SysStatus 状态码
    @apiSuccess {dict} data 返回的数据
    @apiSuccess {string} message 返回的信息
    @apiSuccessExample Success-Response:
    {"sys_status": "SUCCESS", "data": [{"x": "1597734060366886", "y": "92162.22"}, {"x": "1597734060368349", "y": "58487.28"}, {"x": "1597734060368406", "y": "90996.18"}, {"x": "1597734060368449", "y": "35555.03"}, {"x": "1597734060368489", "y": "71398.46"}, {"x": "1597734060368540", "y": "37737.09"}, {"x": "1597734060368581", "y": "26629.52"}, {"x": "1597734060368608", "y": "53514.88"}, {"x": "1597734060368625", "y": "29131.09"}, {"x": "1597734060368639", "y": "54460.71"}, {"x": "1597734165429775", "y": "51630.69"}, {"x": "1597734165431119", "y": "14731.42"}, {"x": "1597734165431153", "y": "63645.18"}, {"x": "1597734165431170", "y": "64182.49"}, {"x": "1597734165431185", "y": "96808.13"}, {"x": "1597734165431199", "y": "28493.87"}, {"x": "1597734165431212", "y": "63122.24"}, {"x": "1597734165431226", "y": "76132.57"}, {"x": "1597734165431251", "y": "11201.22"}, {"x": "1597734165431265", "y": "78820.72"}, {"x": "1597734442171641", "y": "42749.51"}, {"x": "1597734442172854", "y": "13613.53"}, {"x": "1597734442172884", "y": "57844.59"}, {"x": "1597734442172903", "y": "25293.05"}, {"x": "1597734442172921", "y": "97417.43"}, {"x": "1597734442172939", "y": "41561.95"}, {"x": "1597734442172954", "y": "22124.10"}, {"x": "1597734442172971", "y": "54288.22"}, {"x": "1597734442172987", "y": "88957.31"}, {"x": "1597734442173009", "y": "65380.03"}, {"x": "1597734442275460", "y": "36511.15"}, {"x": "1597734442275513", "y": "22840.76"}, {"x": "1597734442275532", "y": "28130.70"}, {"x": "1597734442275547", "y": "81956.60"}, {"x": "1597734442275560", "y": "80154.73"}, {"x": "1597734442275574", "y": "99777.25"}, {"x": "1597734442275586", "y": "40408.01"}, {"x": "1597734442275599", "y": "64369.78"}, {"x": "1597734442275612", "y": "24477.01"}, {"x": "1597734442275625", "y": "84626.01"}, {"x": "1597734464304024", "y": "50097.14"}, {"x": "1597734464304105", "y": "60691.29"}, {"x": "1597734464304126", "y": "22098.32"}, {"x": "1597734464304140", "y": "48037.27"}, {"x": "1597734464304154", "y": "41432.05"}, {"x": "1597734464304168", "y": "34011.72"}, {"x": "1597734464304181", "y": "95118.13"}, {"x": "1597734464304194", "y": "43820.76"}, {"x": "1597734464304207", "y": "42885.36"}, {"x": "1597734464304220", "y": "51607.26"}], "message": null}
    @apiErrorExample Error-Response:
    {"sys_status": "FAILURE", "data": null, "message": "FAILURE"}
    """
    params = table_name_schema(request.args.to_dict())
    if params.get("table") == "table1":
        data_list = Table1.query.with_entities(Table1.x, Table1.y).all()
    else:
        data_list = Table2.query.order_by(Table2.created_at.desc()).with_entities(Table2.x, Table2.y).limit(100).all()
        data_list.reverse()
    return success_handler(data_list)


@blueprint.route('/gen_data', methods=['GET'])
def gen_data(**kwargs):
    """
    @api {GET} /api/v1/table/gen_data 生成数据并存入数据库
    @apiName gen_data
    @apiGroup Table
    @apiSuccess {number} SysStatus 状态码
    @apiSuccess {dict} data 返回的数据
    @apiSuccess {string} message 返回的信息
    @apiSuccessExample Success-Response:
    {"sys_status": "SUCCESS", "data": null, "message": null}
    @apiErrorExample Error-Response:
    {"sys_status": "FAILURE", "data": null, "message": "FAILURE"}
    """
    table_list = []
    data_list = []
    for _ in range(Array_Length):
        x = int(round(time.time() * 1000000))
        y = gen_random()
        table_list.append(Table1(x=x, y=y))
        data_list.append(dict(x=x, y=y))
    db.session.bulk_save_objects(table_list)
    return success_handler(data_list)


@blueprint.route('', methods=['POST'])
def insert_data(**kwargs):
    """
    @api {POST} /api/v1/table table2插入数据
    @apiName insert_data
    @apiGroup Table
    @apiParam {list} data table1的数据
    @apiSuccess {number} SysStatus 状态码
    @apiSuccess {dict} data 返回的数据
    @apiSuccess {string} message 返回的信息
    @apiSuccessExample Success-Response:
    {"sys_status": "SUCCESS", "data": null, "message": null}
    @apiErrorExample Error-Response:
    {"sys_status": "FAILURE", "data": null, "message": "FAILURE"}
    """
    params = table_data_schema(request.json)
    data_list = params.get("data")
    table_list = [Table2(**data) for data in data_list]
    db.session.bulk_save_objects(table_list)
    return success_handler()
