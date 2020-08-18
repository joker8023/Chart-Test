import configparser
import os


class Config(object):
    def __init__(self):
        self.conf = configparser.ConfigParser()
        config_path = os.path.join(os.path.split(os.path.realpath(__file__))[0],
                                   'config/config.cfg')
        self.conf.read(config_path)

    def get_cfg(self, section, name):
        return self.conf.get(section, name)


CONFIG = Config()
