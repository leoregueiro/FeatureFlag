using Microsoft.FeatureManagement;
using Microsoft.AspNetCore.Mvc;

namespace FeatureFlagAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegisterController(IFeatureManager featureManager) : ControllerBase
{
    private readonly IFeatureManager _featureManager = featureManager;

    [HttpPost]
    [EndpointSummary("Registers action with 'EmailVerification' feature flag check.")]
    [EndpointDescription("Processes registration, applying email verification logic if the feature flag is enabled.")]
    [ProducesResponseType<string>(200, contentType: "text/plain")]
    public async Task<IActionResult> ProcessCheckout()
    {
        if (await _featureManager.IsEnabledAsync("EmailVerification"))
        {
            // New registration logic
            return Ok("Registering with email verification");
        }
        // Legacy registration logic
        return Ok("Using legacy registration logic");
    }
}