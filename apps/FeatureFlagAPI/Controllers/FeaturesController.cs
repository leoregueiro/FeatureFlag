using Microsoft.FeatureManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace FeatureFlagAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeaturesController(IFeatureManager featureManager) : ControllerBase
{
    private readonly IFeatureManager _featureManager = featureManager;

    [HttpGet]
    [EndpointSummary("Retrieves all feature flags.")]
    [EndpointDescription("Fetches all feature flags from AWS AppConfig with their current status.")]
    [ProducesResponseType<Dictionary<string, bool>>(200, contentType: "application/json")]
    public async Task<IActionResult> GetFeatures()
    {
        var features = new Dictionary<string, bool>();

        await foreach (var featureName in _featureManager.GetFeatureNamesAsync())
        {
            features[featureName] = await _featureManager.IsEnabledAsync(featureName);
        }

        return Ok(features);
    }
}