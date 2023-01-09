export interface IConfigData {
  configItems: any[];
  config: Record<string, any>;
}

class QorusConfigItems {
  configItems;

  constructor(configData: IConfigData) {
    this.configItems = this.parseConfigItems(configData);
  }

  private parseConfigItems(configData: IConfigData) {
    const { config, configItems } = configData;
    const jobData =
      config &&
      Object.keys(config)?.map((configKey) => {
        const configItem = configItems?.find((configItemData) => configItemData.name === configKey);

        const obj = {
          name: configKey,
          type: config[configKey].type,
          canBeNull: config[configKey].type?.includes(`*`),
          description: config[configKey].desc,
          strictyLocal: config[configKey].stricty_local,
          configGroup: config[configKey].config_group,
          sensitive: config[configKey].sensitive,
          prefix: config[configKey].prefix,
          value: config[configKey].value,
          level: config[configKey].level,
          isSet: config[configKey].is_set,
          isDefaultValueTemplatedString: configItem?.is_default_value_templated_string,
          isValueTemplatedString: configItem?.is_value_templated_string,
          allowedValues: configItem?.allowed_values ?? null,
        };
        return obj;
      });
    return jobData;
  }

  getAll() {
    return this.configItems;
  }

  get(configItemName: string) {
    return this.configItems.find((item) => item.name === configItemName);
  }
}
export default QorusConfigItems;
