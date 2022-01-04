import paver
from paver.easy import *
import paver.setuputils
paver.setuputils.install_distutils_tasks()
import os, sys
from runestone.server import get_dburl
from sphinxcontrib import paverutils
import pkg_resources
from socket import gethostname
from runestone import get_master_url

sys.path.append(os.getcwd())

home_dir = os.getcwd()
master_url = None
if not master_url:
    master_url = get_master_url()

dynamic_pages = True
master_app = 'runestone'
serving_dir = "./build/httlads"
if dynamic_pages:
    dest = './published'
else:
    dest = "../../static"

options(
    sphinx = Bunch(docroot=".",),

    build = Bunch(
        builddir="./build/httlads",
        sourcedir="_sources",
        outdir="./build/httlads",
        confdir=".",
        project_name = "httlads",
        template_args={'course_id': 'httlads',
                       'login_required':'false',
                       'appname':master_app,
                       'loglevel': 10,
                       'course_url':master_url,
                       'dynamic_pages': dynamic_pages,
                       'use_services': 'true',
                       'python3': 'true',
                       'dburl': 'postgresql://user:password@localhost/runestone',
                       'default_ac_lang': 'python',
                       'basecourse': 'httlads',
                       'downloads_enabled': 'false',
                       'enable_chatcodes': 'false',
                       'allow_pairs': 'false'
                        }
    )
)


version = pkg_resources.require("runestone")[0].version
options.build.template_args['runestone_version'] = version

# If DBURL is in the environment override dburl
options.build.template_args['dburl'] = get_dburl(outer=locals())

from runestone import build  # build is called implicitly by the paver driver.
