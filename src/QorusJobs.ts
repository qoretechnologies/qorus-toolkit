import QorusConfigItems, { ConfigData } from './QorusConfigItems';
import QorusRequest from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

class QorusJob {
  // Api path for the jobs
  browsePath = apiPathsInitial.jobs.browse;

  // Raw job data for a single job
  jobRaw;

  // Parsed job data
  job;

  constructor(job?: any) {
    this.jobRaw = job;
    const configItems: any[] = job?.config_items;
    const config: Record<string, any> = job?.config;
    const configData: ConfigData = { config, configItems };

    this.job = {
      jobId: this.jobRaw?.jobid,
      name: this.jobRaw?.name,
      createdAt: this.jobRaw?.created,
      modifiedAt: this.jobRaw?.modified,
      author: this.jobRaw?.author,
      source: this.jobRaw?.source,
      language: this.jobRaw?.language,
      descriptions: this.jobRaw?.description,
      enabled: this.jobRaw?.enabled,
      code: this.jobRaw?.code,
      classBased: this.jobRaw?.class_based,
      className: this.jobRaw?.class_name,
      month: this.jobRaw?.month,
      day: this.jobRaw?.day,
      wday: this.jobRaw?.wday,
      hour: this.jobRaw?.hour,
      minute: this.jobRaw?.minute,
      configItems: new QorusConfigItems(configData),
    };
  }

  async getAll() {
    const result: { data: any[] } | any = await QorusRequest.get({
      path: this.browsePath,
    });
    return result.data;
  }

  async get(jobId: string) {
    const result: { data: any[] } | any = await QorusRequest.get({
      path: `${this.browsePath}/${jobId}`,
    });
    return new QorusJob(result.data);
  }

  getJobRaw() {
    return this.jobRaw;
  }

  getJob() {
    return this.job;
  }

  getConfigItems() {
    return this.job?.configItems;
  }
}

export default new QorusJob();
