export const getFinishes = (use, finish, scene, scenes) => {
  const currentScene = scenes.find((item) => item.key === scene);

  if (currentScene) {
    const useToSearch = use === 'default' ? currentScene.defaultUse : use;
    const currentSceneUse = currentScene.uses.find(
      (item) => item.key === useToSearch
    );
    if (currentSceneUse) {
      return currentSceneUse.finishScenes;
    }
  }

  return [];
};

export const getSelectedFinish = (use, finish, scene, scenes) => {
  const currentScene = scenes.find((item) => item.key === scene);

  if (currentScene) {
    const currentFinish =
      finish === 'default' ? currentScene.defaultFinish : finish;

    return currentFinish;
  }

  return '';
};
